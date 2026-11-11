import React, { useState } from "react";

import photo1 from "./images/photo1.jpg";
import photo2 from "./images/photo2.jpg";
import photo3 from "./images/photo3.jpg";
import photo4 from "./images/photo4.jpg";

// База данных товаров
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Ламы-чашки",
    category: "Чашки",
    price: 1450,
    volume: "300 мл",
    material: "Глина",
    image: photo1,
    description:
      "Лепила эти чашки еще прошлым летом, сейчас нашла и вспомнила. ",
  },
  {
    id: 2,
    title: "Бульдог Февраль",
    category: "Куклы",
    price: 1200,
    volume: "350 мл",
    material: "Керамика",
    image: photo2,
    description:
      "Это бульдожек Февраль. Голова, ножки, ручки естественно керамические). В пару ему хочу сделать ещё такого же",
  },
  {
    id: 3,
    title: "Новогодняя фигурка",
    category: "Фигурки",
    price: 3200,
    dimensions: "18х10 см",
    material: "Керамика",
    image: photo3,
    description:
      "С Наступающим Новым Годом! Здоровья всем, удачи, любви и всего самого доброго! 🫶🥂🎊",
  },
  {
    id: 4,
    title: "Куропатки",
    category: "Фигурки",
    price: 850,
    dimensions: "6х8 см",
    material: "Раку",
    image: photo4,
    description: "Просто красивые куропатки",
  },
];

// Вспомогательный компонент для интерактивных кнопок с эффектом :hover
function HoverButton({
  onClick,
  children,
  style = {},
  activeStyle = {},
  type = "button",
}) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    padding: "10px 20px",
    border: "1px solid #C37B67",
    borderRadius: "20px",
    backgroundColor: "transparent",
    color: "#C37B67",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "14px",
    outline: "none",
    ...style,
  };

  const hoverEffect = isHovered
    ? {
        backgroundColor:
          style.backgroundColor === "#C37B67"
            ? "#A86452"
            : "rgba(195, 123, 103, 0.1)",
        transform: "translateY(-1px)",
        ...activeStyle,
      }
    : {};

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...hoverEffect }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProducts =
    selectedCategory === "Все"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Добавление товара
  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Удаление товара
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Общее количество штук (а не типов)
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Общая стоимость
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSubmitted(true);
      setFormData({ name: "", phone: "", comment: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  // Палитра стилей
  const themeStyles = {
    app: {
      fontFamily: "Arial",
      backgroundColor: "#FBF9F6",
      color: "#3E3835",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "#FFF",
      borderBottom: "1px solid #E6DFD3",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      letterSpacing: "1px",
      color: "#C37B67",
    },
    hero: {
      textAlign: "center",
      padding: "80px 20px",
      background:
        'linear-gradient(rgba(242, 235, 224, 0.85), rgba(251, 249, 246, 1)), url("https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600&q=80")',
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    filterNav: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      margin: "40px 0",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "30px",
      padding: "0 40px 60px 40px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#FFF",
      borderRadius: "12px",
      overflow: "hidden",
      border: "3px solid #E6DFD3",
      display: "flex",
      flexDirection: "column",
    },
    cardImg: {
      width: "100%",
      height: "240px",
      objectFit: "cover",
    },
    cardContent: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
    tag: {
      fontSize: "12px",
      color: "#9CAF9C",
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: "5px",
    },
    meta: {
      fontSize: "13px",
      color: "#7A726E",
      margin: "8px 0",
      fontStyle: "italic",
    },
    price: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#3E3835",
      marginTop: "auto",
      paddingTop: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    sectionAbout: {
      backgroundColor: "#EAE3D5",
      textAlign: "center",
    },
    formSection: {
      maxWidth: "500px",
      margin: "60px auto",
      padding: "30px",
      backgroundColor: "#FFF",
      borderRadius: "12px",
      border: "1px solid #E6DFD3",
      boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0 20px 0",
      borderRadius: "6px",
      border: "3px solid #CBD5E1",
      boxSizing: "border-box",
    },
    sidebar: {
      position: "fixed",
      top: 0,
      right: isCartOpen ? 0 : "-400px",
      width: "350px",
      height: "100vh",
      backgroundColor: "#FFF",
      boxShadow: "-5px 0 25px rgba(0,0,0,0.1)",
      transition: "right 0.3s ease",
      zIndex: 1000,
      padding: "30px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    },
    filledBtn: {
      backgroundColor: "#C37B67",
      color: "#FFF",
    },
  };

  return (
    <div style={themeStyles.app}>
      {/* Навигация */}
      <header style={themeStyles.header}>
        <div style={themeStyles.logo}>Руки в глине</div>
        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <a
            href="https://t.me/ala_pots"
            target="_blank"
            rel="noopener noreferrer"
            title="Наш Telegram-канал"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="data:image/png;base64,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"
              alt="Telegram"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </a>
          <HoverButton
            style={themeStyles.filledBtn}
            activeStyle={{ backgroundColor: "#A86452" }}
            onClick={() => setIsCartOpen(true)}
          >
            Корзина ({totalItemsCount})
          </HoverButton>
        </nav>
      </header>

      {/* Промо-блок */}
      <section style={themeStyles.hero}>
        <h1
          style={{ fontSize: "3rem", marginBottom: "10px", color: "#3E3835" }}
        >
          Тепло рук в каждом изделии
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#7A726E",
            maxWidth: "600px",
            margin: "0 auto 30px auto",
          }}
        >
          Авторская керамика ручной работы
        </p>
        <HoverButton
          style={{
            ...themeStyles.filledBtn,
            padding: "12px 30px",
            fontSize: "16px",
          }}
          activeStyle={{ backgroundColor: "#A86452" }}
          onClick={() =>
            document
              .getElementById("catalog")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Смотреть каталог
        </HoverButton>
      </section>

      {/* Секция витрины */}
      <main id="catalog" style={{ padding: "20px 0" }}>
        <h2
          style={{ textAlign: "center", fontSize: "2rem", marginTop: "20px" }}
        >
          Коллекции из мастерской
        </h2>

        {/* Фильтры категорий */}
        <div style={themeStyles.filterNav}>
          {["Все", "Чашки", "Куклы", "Фигурки"].map((cat) => (
            <HoverButton
              key={cat}
              style={selectedCategory === cat ? themeStyles.filledBtn : {}}
              activeStyle={
                selectedCategory === cat ? { backgroundColor: "#A86452" } : {}
              }
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </HoverButton>
          ))}
        </div>

        {/* Сетка товаров */}
        <div style={themeStyles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={themeStyles.card}>
              <img
                src={product.image}
                alt={product.title}
                style={themeStyles.cardImg}
              />
              <div style={themeStyles.cardContent}>
                <span style={themeStyles.tag}>{product.category}</span>
                <h3 style={{ margin: "5px 0 10px 0", fontSize: "18px" }}>
                  {product.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.4",
                    margin: "0",
                  }}
                >
                  {product.description}
                </p>
                <div style={themeStyles.meta}>
                  Материал: {product.material} <br />
                  {product.volume
                    ? `Объем: ${product.volume}`
                    : `Размер: ${product.dimensions}`}
                </div>
                <div style={themeStyles.price}>
                  <span>{product.price} ₽</span>
                  <HoverButton
                    style={{ padding: "6px 14px", fontSize: "13px" }}
                    onClick={() => addToCart(product)}
                  >
                    + В корзину
                  </HoverButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Форма заявки */}
      <section style={themeStyles.formSection}>
        <h3 style={{ textAlign: "center", marginTop: 0, fontSize: "22px" }}>
          Хотите что-то особенное?
        </h3>
        <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
          Оставьте заявку, и мы обсудим создание вашей "керамической" мечты!
        </p>

        {formSubmitted ? (
          <div
            style={{
              backgroundColor: "#EDF7ED",
              color: "#1E4620",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            ✨ Спасибо! Мы свяжемся с вами в течение дня для обсуждения эскиза.
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
            <label
              style={{ display: "block", fontWeight: "600", fontSize: "14px" }}
            >
              Ваше имя
            </label>
            <input
              type="text"
              required
              placeholder="Иван Иванович"
              style={themeStyles.input}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label
              style={{ display: "block", fontWeight: "600", fontSize: "14px" }}
            >
              Ваша почта
            </label>
            <input
              type="text"
              required
              placeholder="example@test.com"
              style={themeStyles.input}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <label
              style={{ display: "block", fontWeight: "600", fontSize: "14px" }}
            >
              Пожелания к заказу
            </label>
            <textarea
              rows="3"
              placeholder="Например: Хочу большую чайную кружку бирюзового цвета..."
              style={{ ...themeStyles.input, resize: "none" }}
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />

            <HoverButton
              type="submit"
              style={{
                ...themeStyles.filledBtn,
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                borderRadius: "6px",
              }}
              activeStyle={{ backgroundColor: "#A86452" }}
            >
              Отправить
            </HoverButton>
          </form>
        )}
      </section>

      {/* Сайдбар корзины */}
      <aside style={themeStyles.sidebar}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ margin: 0 }}>Ваш заказ</h3>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#7A726E",
            }}
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
        </div>

        <div style={{ flexGrow: 1, overflowY: "auto" }}>
          {cart.length === 0 ? (
            <p
              style={{
                color: "#7A726E",
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              Корзина пока пуста. Самое время выбрать чашечку!
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "15px",
                  padding: "10px 0",
                  borderBottom: "1px solid #E6DFD3",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                    {item.title}
                  </h4>
                  <span style={{ fontSize: "13px", color: "#666" }}>
                    {item.quantity} шт. × {item.price} ₽
                  </span>
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#E11D48",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ paddingTop: "20px", borderTop: "1px solid #E6DFD3" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <HoverButton
              style={{
                ...themeStyles.filledBtn,
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                borderRadius: "6px",
              }}
              activeStyle={{ backgroundColor: "#A86452" }}
              onClick={() =>
                alert(
                  `Заказ на сумму ${totalPrice} ₽ оформлен! Спасибо за покупку.`,
                )
              }
            >
              Оформить покупку
            </HoverButton>
          </div>
        )}
      </aside>

      {/* Футер */}
      <footer
        style={{
          backgroundColor: "#3E3835",
          color: "#E6DFD3",
          padding: "30px 40px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} Руки в глине.
      </footer>
    </div>
  );
}
