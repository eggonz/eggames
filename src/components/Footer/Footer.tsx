import './Footer.module.css';

interface FooterProps {
  leftText: string
  rightText: string
}

export default function Footer({ leftText, rightText }: FooterProps) {
  return (
    <footer>
      <p>{leftText}</p>
      <p>{rightText}</p>
    </footer>
  );
}