export function getBase64(file: File, callback: (result: string) => void): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    callback(reader.result as string);
  };

  reader.onerror = () => {
    callback('');
  };
}