import React, { useState, useEffect } from "react";

const SECTIONS = [
  { id: "about", label: "О маркете" },
  { id: "location", label: "Локация" },
  { id: "brands", label: "Бренды" },
  { id: "music", label: "Музыка" },
  { id: "activities", label: "Активности" },
  { id: "food", label: "Еда" },
  { id: "map", label: "Карта" },
  { id: "partners", label: "Партнеры" },
  { id: "media", label: "Медиа" },
];

const LOCAL_KEY = "remarket_sections";
const ADMIN_PASS = "InOut123"; // Пароль для входа в админку

// Определяю, сколько картинок нужно для каждой секции
const SECTION_IMAGES: Record<string, number> = {
  brands: 3,
  music: 3,
  partners: 4,
  media: 4,
};

export default function Admin() {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    let initial = null;
    if (saved) {
      initial = JSON.parse(saved);
      // Миграция: для секций с несколькими картинками
      for (const key in SECTION_IMAGES) {
        if (initial[key]) {
          if (!Array.isArray(initial[key].images)) {
            // Если есть image, переносим в images, иначе пустой массив
            const arr = initial[key].image ? [initial[key].image] : [];
            initial[key].images = arr.concat(Array(SECTION_IMAGES[key] - arr.length).fill(""));
            delete initial[key].image;
          } else if (initial[key].images.length < SECTION_IMAGES[key]) {
            // Если массив короче нужного — дополняем
            initial[key].images = initial[key].images.concat(Array(SECTION_IMAGES[key] - initial[key].images.length).fill(""));
          }
        }
      }
      // Для heroImage: если нет — добавить
      if (!('heroImage' in initial)) initial.heroImage = "";
      return initial;
    }
    // дефолтные значения
    return Object.fromEntries(SECTIONS.map(s => [
      s.id,
      SECTION_IMAGES[s.id]
        ? { text: "", images: Array(SECTION_IMAGES[s.id]).fill("") }
        : { text: "", image: "" }
    ]));
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuth) localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }, [data, isAuth]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      setIsAuth(true);
      setMessage("");
    } else {
      setMessage("Неверный пароль");
    }
  };

  // Для секций с images: string[]
  const handleImageArrayUpload = (id: string, idx: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setData((prev: any) => ({
        ...prev,
        [id]: {
          ...prev[id],
          images: prev[id].images.map((img: string, i: number) => i === idx ? result : img)
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  // Для секций с image: string
  const handleImageUpload = (id: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      handleChange(id, "image", result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (id: string, field: "text" | "image", value: string) => {
    setData((prev: any) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    setMessage("Сохранено!");
    setTimeout(() => setMessage(""), 1500);
  };

  // Загрузка титульной картинки
  const handleHeroImageUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setData((prev: any) => ({ ...prev, heroImage: result }));
    };
    reader.readAsDataURL(file);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8f3] px-4" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 font-serif" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>Вход в админку</h2>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
            <input
              type="password"
              placeholder="Пароль"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-lg outline-none focus:border-gray-500 transition-all duration-200"
              autoFocus
              style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
            />
            <button type="submit" className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white text-lg font-medium hover:bg-gray-800 transition-all duration-200" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>Войти</button>
          </form>
          {message && <div className="text-red-500 mt-4 text-base" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>{message}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f3] py-10 px-2" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 font-serif text-center" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>Админка: секции сайта</h2>
        <div className="border border-gray-200 rounded-xl p-6 mb-8 bg-[#fafbfa] shadow-sm" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 font-serif">Титульная картинка (первый разделитель)</h3>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleHeroImageUpload(e.target.files?.[0] || null)}
            className="block w-full text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all duration-200"
            style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
          />
          {data.heroImage && (
            <img
              src={data.heroImage}
              alt="hero preview"
              className="mt-4 rounded-lg border border-gray-200 max-w-[320px] max-h-[180px] shadow"
              style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
            />
          )}
        </div>
        <form onSubmit={handleSave} className="flex flex-col gap-8" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
          {SECTIONS.map(section => (
            <div key={section.id} className="border border-gray-200 rounded-xl p-6 mb-2 bg-[#fafbfa] shadow-sm" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 font-serif" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>{section.label}</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>Описание/доп. текст:</label>
                <textarea
                  value={data[section.id]?.text || ""}
                  onChange={e => handleChange(section.id, "text", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-base outline-none focus:border-gray-500 transition-all duration-200 min-h-[48px]"
                  style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-2 font-medium" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>
                  Картинка{SECTION_IMAGES[section.id] ? ` (${SECTION_IMAGES[section.id]} шт.)` : ''}:
                </label>
                {SECTION_IMAGES[section.id]
                  ? data[section.id].images.map((img: string, idx: number) => (
                      <div key={idx} className="mb-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleImageArrayUpload(section.id, idx, e.target.files?.[0] || null)}
                          className="block w-full text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all duration-200"
                          style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
                        />
                        {img && (
                          <img
                            src={img}
                            alt={`preview${idx+1}`}
                            className="mt-2 rounded-lg border border-gray-200 max-w-[180px] max-h-[120px] shadow"
                            style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
                          />
                        )}
                      </div>
                    ))
                  : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(section.id, e.target.files?.[0] || null)}
                        className="block w-full text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all duration-200"
                        style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
                      />
                      {data[section.id]?.image && (
                        <img
                          src={data[section.id].image}
                          alt="preview"
                          className="mt-4 rounded-lg border border-gray-200 max-w-[180px] max-h-[120px] shadow"
                          style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}
                        />
                      )}
                    </>
                  )}
              </div>
            </div>
          ))}
          <button type="submit" className="w-full md:w-1/2 mx-auto px-6 py-3 rounded-xl bg-gray-900 text-white text-lg font-medium hover:bg-gray-800 transition-all duration-200 mt-2" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>Сохранить</button>
          {message && <div className="text-green-600 mt-4 text-center text-base" style={{ fontFamily: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif` }}>{message}</div>}
        </form>
      </div>
    </div>
  );
} 