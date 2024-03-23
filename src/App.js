import React, { useState } from "react";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 20
      }}
    >
      <ValidatedForm />
    </div>
  );
}

const ValidatedForm = () => {
  //2-  degiskenleri tutmak icin State hook'ları ile username, password ve accounts state'lerini tanımlayalim
  const [username, setUsername] = useState("");//username icin
  const [password, setPassword] = useState("");// password icin
  const [accounts, setAccounts] = useState([
    { username: "NamıkKorona1", password: "1234567" }
  ]);// yeni hesabi saklamak icin

  //3- Form submit edildiğinde gerçekleşecek işlemleri tanımlayalim
  //  sayfanın beklenmedik şekilde davranmasını önleyebilmek icin e.preventDefault() yöntemiyle, bir olayın varsayılan davranışını engelleyerek, olayın kontrolünü JavaScript'e alalim.
  // Form submit olayı gerçekleştiğinde , tarayıcı varsayılan olarak sayfayı yeniden yükler ve form verilerini bir sunucuya gönderir. Ancak, bazen sayfayı yeniden yüklemek istemeyebiliriz; örneğin, bir Single Page Application (SPA) içinde çalışırken veya form verilerini JavaScript kullanarak işlemek istediğimizde.
//  e.preventDefault() kodunda e, form submit olayının bir parçası olan olay nesnesini temsil eder ve bu nesne üzerinden olayın varsayılan davranışını engelleriz.
  
  const onSubmit = (e) => {
    e.preventDefault();

    // Girilen username ve password'un uzunluklarını kontrol edelim ve gerekli işlemleri gerçekleştirelim
    if (username.length < 6 || password.length < 6) {
      alert("Username ve password, 6 karakterden uzun olmalıdır");
    } else if (username.length > 20 || password.length > 20) {
      alert("Username 20 karakteri geçemez");
    } else {
      const existingAccount = accounts.find(
        (account) => account.username === username && account.password === password
        //find() metodu, bir dizi içerisinde belirli bir koşulu sağlayan ilk öğeyi bulmaya yarar.
        //Eğer bu fonksiyonun döndürdüğü değer true ise, find() fonksiyonu bu elemanı bulmuş olur ve döngüyü sonlandırır. Eğer hiçbir eleman koşulu sağlamıyorsa undefined döner.
        //account parametresi, dizideki her bir elemanı temsil eder. Fonksiyon, bu elemanların username ve password alanlarını kontrol ederek aranan bir hesabı bulmayı amaçlar.
      );

      // Mevcut bir hesapla eşleşen kullanıcı varsa hoş geldin mesajı gösterelim ve inputları temizlemeyide unutmayalim(ben unnuttum sonradan eklemdim)
      if (existingAccount !== undefined)  {
        alert(`Hoş geldiniz, ${username}`);
        setUsername("");
        setPassword("");
      } else {
        //Buraya kadar Eşleşen hesap yoksa yeni hesap oluştursun ve bilgi mesajı göstersin ve yine inputları temizlemeyide unutmayalim
        const newAccount = { username, password };
        setAccounts([...accounts, newAccount]);
        alert(`Yeni hesap oluşturuldu, Merhaba  ${username}`);
        setUsername("");
        setPassword("");
      }
    }
  };
//1-  Bileşen, kullanıcı adı ve şifre için iki adet input alanından oluşan bir form içermelidir. Ayrıca, bu input alanlarının altında bir "Login" butonu bulunmalıdır.
//1- ilk islem ollarak render altinda bir form olusturalim , login baslik , iki adet input ve submit butonu
// bilgi olarak:Form elementi, kullanıcıdan veri girişi almak için kullanılan bir yapıdır. Bu veri girişi genellikle metin kutuları, parola kutuları, onay kutuları, radyo düğmeleri, açılır menüler, düğmeler vb. gibi çeşitli form elemanları aracılığıyla yapılır.
// bilgi olarak:Form etiketi içindeki tüm form elemanları, tarayıcı tarafından bir form olarak kabul edilir ve formun gönderilmesi durumunda bu elemanlar tarafından sağlanan veriler bir web sunucusuna gönderilir.
  // Formu render et
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        border: "solid",
        padding: 10
      }}
      onSubmit={onSubmit}
    >
      {/* Başlık */}
      <h3>Login</h3>
      {/* Kullanıcı adı inputu */}
      <input
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 5, border: "2px solid black" }}
      />
      {/* Şifre inputu */}
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 10, border: "2px solid black" }}
      />
      {/* Submit butonu */}
      <button
        style={{
          alignSelf: "center",
          backgroundColor: "#f0f0f0",
          color: "black",
          padding: "10px 20px",
          border: "2px solid black",
          cursor: "pointer"
        }}
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default App;
// en son guzel  bir gorunumde olmasi icin biraz style  ekleyelim. bu kisimda sinir yok