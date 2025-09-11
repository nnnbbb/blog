
export function formatDate(isoStr: string): string {
  const date = new Date(isoStr);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  return date.toLocaleDateString('en-US', options);
}
