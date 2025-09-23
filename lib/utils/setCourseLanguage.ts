export function setCourseLanguage(courseLanguage: string) {
  switch (courseLanguage) {
    case "en":
      return "English";
    case "fa":
      return "Farsi";

    default:
      return "English";
  }
}
