export const getDriveId = (url: string) => {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                url.match(/\/d\/([a-zA-Z0-9_-]+)/) || 
                url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export const isGoogleDriveLink = (url: string) => {
  return url.includes('drive.google.com');
};

export const getDriveIframeUrl = (url: string) => {
  try {
    const id = getDriveId(url);
    if (id) {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
  } catch (e) {
    console.error(e);
  }
  // Try replacing view with preview just in case
  return url.replace('/view', '/preview');
};

export const getDriveThumbnail = (url: string) => {
  // Google Drive video thumbnail hotlinking without an API key doesn't work reliably and throws 403.
  // Instead of a broken image, returning a clean placeholder image from Unsplash.
  return "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80";
};
