import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          © {new Date().getFullYear()} Sazón Imperial. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
