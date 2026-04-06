import { NextRequest, NextResponse } from 'next/server';

// Backend integration point: GitHub API persistence
// Requires env vars: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, ADMIN_SECRET
export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || token !== adminSecret) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ error: 'Contenido requerido' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!githubToken || !owner || !repo) {
      // In development without env vars, return success for UI testing
      return NextResponse.json({
        success: true,
        message: 'Contenido actualizado (modo desarrollo)',
      });
    }

    // Step 1: Get current file SHA from GitHub
    const getResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/data/content.json`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!getResponse.ok) {
      throw new Error(`GitHub GET failed: ${getResponse.status}`);
    }

    const fileData = await getResponse.json();
    const sha = fileData.sha;

    // Step 2: Encode new content as Base64
    const contentString = JSON.stringify(content, null, 2);
    const contentBase64 = Buffer.from(contentString, 'utf-8').toString('base64');

    // Step 3: PUT updated content to GitHub
    const putResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/data/content.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update content from admin panel',
          content: contentBase64,
          sha,
        }),
      }
    );

    if (!putResponse.ok) {
      const errData = await putResponse.json();
      throw new Error(`GitHub PUT failed: ${JSON.stringify(errData)}`);
    }

    return NextResponse.json({ success: true, message: 'Contenido guardado en GitHub' });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Error al guardar el contenido', detail: String(error) },
      { status: 500 }
    );
  }
}