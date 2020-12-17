
export const exportPdfFile = (name: string, data: any) => {
  try {
    const blob = new Blob([data]);
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    console.error('Error exporting pdf', e);
  }
}
