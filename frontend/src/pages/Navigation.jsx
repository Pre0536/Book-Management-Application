import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/home">Startseite</Link></li>
        <li><Link to="/addBook">Buch hinzufügen</Link></li>
        <li><Link to="/statistic">Statistik</Link></li>
        <li><Link to="/authorList">Autoren</Link></li>
        <li><Link to="/addAuthor">Autor hinzufügen</Link></li>
      </ul>
    </nav>
  );
}