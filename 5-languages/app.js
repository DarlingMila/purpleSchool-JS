const language = prompt("Languаge: ru / en / de / it / es / fr ?");
let greetings;

switch (language) {
  case "ru":
    greetings = "Добрый день!";
    break;
  case "en":
    greetings = "Good afternoon!";
    break;
  case "de":
    greetings = "Guten Tag!";
    break;
  case "it":
    greetings = "Buongiorno!";
    break;
  case "es":
    greetings = "¡Buenos días!";
    break;
  case "fr":
    greetings = "Bonjour!";
    break;
  default:
    greetings = "Sul Sul!";
    break;
}

console.log(greetings);
