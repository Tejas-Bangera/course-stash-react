import GitHub from "./GitHub";
import LinkedIn from "./LinkedIn";
import Mail from "./Mail";

const Footer = () => {
  return (
    <footer className="flex items-center p-2">
      <GitHub />
      <p className="mx-auto text-sm italic">
        Made by <span className="font-bold">Tejas Bangera</span>
      </p>

      <div className="flex items-center gap-x-1">
        <LinkedIn />
        <Mail />
      </div>
    </footer>
  );
};
export default Footer;
