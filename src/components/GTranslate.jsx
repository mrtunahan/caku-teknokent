import { useEffect } from "react";

const GTranslate = () => {
  useEffect(() => {
    // Eğer script daha önce eklendiyse tekrar ekleme
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "tr",
            includedLanguages: "tr,en,ar", // Sadece bu diller
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  // Görünmez bir kapsayıcı (CSS ile gizleyeceğiz)
  return (
    <div id="google_translate_element" style={{ display: 'none' }}></div>
  );
};

export default GTranslate;