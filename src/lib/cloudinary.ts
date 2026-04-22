const uploadToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        console.error("SYS_ERR: Cloudinary environment variables are missing.");
        return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
        { method: "POST", body: formData }
      );
      
      const data = await response.json();
      
      if (data.error) {
        console.error("CLOUDINARY_API_ERR:", data.error.message);
        return null;
      }

      return data.secure_url;
    } catch (error) {
      console.error("NETWORK_ERR: Cloudinary relay failed.", error);
      return null;
    }
};
export { uploadToCloudinary };