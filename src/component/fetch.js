export const fetchData = async () => {
    try {
      const res = await fetch("https://snapus.pythonanywhere.com/api/images_with_random_num/");
      const images = await res.json();
      return images;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };