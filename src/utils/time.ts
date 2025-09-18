import dayjs from "dayjs";

export function formatDate(isoStr: string): string {
  const date = dayjs(isoStr);

  if (!date.isValid()) {
    return "";
  }

  return date.format("MMM DD, YYYY");
}

export function validDate(s: string) {
  const date = dayjs(s);
  return date.isValid()
}
