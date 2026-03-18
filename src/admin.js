import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Admin() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    // 1. Upload image to Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('furniture-photos')
      .upload(fileName, file);

    if (error) return alert("Upload failed!");

    // 2. Get Public URL
    const { data: urlData } = supabase.storage
      .from('furniture-photos')
      .getPublicUrl(fileName);

    // 3. Save to Database
    await supabase.from('furniture').insert([
      { name, price, image_url: urlData.publicUrl }
    ]);

    alert("Furniture Added Successfully!");
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload Product</button>
    </form>
  );
}
