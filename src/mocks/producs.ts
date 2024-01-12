import pantalones from '../assets/icons/pantalones.png';
import collar from '../assets/icons/collar.png';
import elipsis from '../assets/icons/elipsis.png';
import sudadera from '../assets/icons/sudadera.png';
import juguetes from '../assets/icons/juguetes.png';
import campera from '../assets/icons/campera.png';
import gorra from '../assets/icons/gorra.png';
import botas from '../assets/icons/botas.png';
import bolso from '../assets/icons/bolso.png';
import mochila from '../assets/icons/mochila.png';
import sabanas from '../assets/icons/sabanas.png';
import calcetines from '../assets/icons/calcetines.png';
import boxers from '../assets/icons/boxers.png';
import calzas from '../assets/icons/calzas.png';
import jeans from '../assets/icons/jeans.png';
import sandalias from '../assets/icons/sandalias.png';
import remera from '../assets/icons/remera.png';
import zapatilla from '../assets/icons/zapatilla.png';

interface ProductCategory {
  type: string;
  title: string;
  icon: string;
}

export const producsCategory: ProductCategory[] = [
  { type: 't-shirts', title: 'Remeras', icon: remera },
  { type: 'pants', title: 'Pantalones', icon: pantalones },
  { type: 'sneakers', title: 'Zapatillas', icon: zapatilla },
  { type: 'sweatshirts', title: 'Buzos', icon: sudadera },
  { type: 'accessories', title: 'Accesorios', icon: collar },
  { type: 'toys', title: 'Juguetes', icon: juguetes },
  { type: 'jackets', title: 'Camperas', icon: campera },
  { type: 'cap', title: 'Gorras', icon: gorra },
  { type: 'boots', title: 'Borcegos', icon: botas },
  { type: 'handbags', title: 'Bolsos', icon: bolso },
  { type: 'bags', title: 'Mochilas', icon: mochila },
  { type: 'bed sheets', title: 'Sábanas', icon: sabanas },
  { type: 'socks', title: 'Medias', icon: calcetines },
  { type: 'underwear', title: 'Ropa interior', icon: boxers },
  { type: 'leggings', title: 'Calzas', icon: calzas },
  { type: 'jeans', title: 'Jeans', icon: jeans },
  { type: 'sandals', title: 'Sandalias', icon: sandalias },
  { type: 'other', title: 'Otros', icon: elipsis },
];

interface InputProduct {
  name: string;
  placeholder: string;
  title: string;
  type?: string;
}

export const inputProducs: InputProduct[] = [
  {
    name: 'name',
    placeholder: 'Zapatilla Deportiva Nike..',
    title: 'Nombre del producto :',
  },
  {
    name: 'price',
    placeholder: '$ 7000',
    title: 'Precio :',
    type: 'numeric',
  },
  { name: 'brand', placeholder: 'Nike ...', title: 'Marca :' },
  { name: 'color', placeholder: 'Amarillo con blanco...', title: 'Color :' },
  {
    name: 'description',
    placeholder: 'Zapatilla modelo ancho...',
    title: 'Descripción :',
  },
];

export interface NewProduct {
  user: string;
  produc_name: string;
  produc_brand: string;
  produc_style: string;
  produc_size: string;
  produc_description: string;
  produc_price: number;
  produc_color: string;
  produc_category: string;
  produc_image_url: string;
  produc_age: string;
  produc_gender: string;
  produc_state: boolean;
  produc_stock: number;
  produc_discount: string;
  produc_variations: string;
}

export const newProduc: NewProduct = {
  user: 'id del usuario',
  produc_name: 'Nombre del producto OBLIGATORIO',
  produc_brand: 'marca del producto typarlo',
  produc_style: 'estilo Depo , formal etc',
  produc_size: 'talla , typarlo',
  produc_description: 'des',
  produc_price: 999,
  produc_color: 'colores',
  produc_category: 'categorias (fotos)',
  produc_image_url: 'image',
  produc_age: '',
  produc_gender: 'genero',
  produc_state: true,
  produc_stock: 10,
  produc_discount: 'asds',
  produc_variations: 'variaciones de imagenes',
};

interface ProductSizes {
  number: number[];
  letter: string[];
}

export const productsSize = (): ProductSizes => {
  const size_number = [];
  for (let i = 1; i <= 60; i++) {
    size_number.push(i);
  }

  return {
    number: size_number,
    letter: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'N/A'],
  };
};

export interface SelectedOption {
  title: string;
  options: string[];
  change: string;
}

export const selectedOption: SelectedOption[] = [
  { title: 'Género :', options: ['Masculino', 'Femenino'], change: 'gender' },
  { title: 'Edad :', options: ['Niño', 'Adulto'], change: 'age' },
  {
    title: 'Estilo :',
    options: ['Deportivo', 'Urbano', 'Salida'],
    change: 'style',
  },
];

export const colors = [
  { type: 'RED', title: 'ROJO 🟥' },
  { type: 'BLUE', title: 'AZUL 🔵' },
  { type: 'GREEN', title: 'VERDE 🟩' },
  { type: 'YELLOW', title: 'AMARILLO 🟨' },
  { type: 'ORANGE', title: 'NARANJA 🟧' },
  { type: 'PURPLE', title: 'VIOLETA 🟪' },
  { type: 'PINK', title: 'ROSADO 🌸' },
  { type: 'BROWN', title: 'MARRÓN 🟫' },
  { type: 'GRAY', title: 'GRIS 🟨' },
  { type: 'BLACK', title: 'NEGRO ⚫' },
  { type: 'WHITE', title: 'BLANCO ⚪' },
  { type: 'UNSPECIFIED', title: 'SIN ESPECIFICAR ❓' },
];

export const genders = [
  { type: 'MALE', title: 'MASCULINO' },
  { type: 'FEMALE', title: 'FEMENINO' },
  { type: 'UNSPECIFIED', title: 'SIN ESPECIFICAR' },
];

export const brands = [
  { type: 'NIKE', title: 'NIKE' },
  { type: 'PUMA', title: 'PUMA' },
  { type: 'ADDIDAS', title: 'ADDIDAS' },
  { type: 'OTHER', title: 'OTRA' },
];

export const styles = [
  { type: 'URBAN', title: 'URBANAS' },
  { type: 'SPORTS', title: 'DEPORTIVAS' },
  { type: 'UNSPECIFIED', title: 'SIN ESPECIFICAR' },
];

export const DropdownTypes = {
  colors: {
    name: 'color',
    title: 'Selecciona un color :',
    options: colors,
  },
  genders: {
    name: 'gender',
    title: 'Seleccionar un genero :',
    options: genders,
  },
  brands: {
    name: 'brand',
    title: 'Selecciona una marca :',
    options: brands,
  },
  styles: {
    name: 'style',
    title: 'Selecciona un estilo :',
    options: styles,
  },
  ages: {
    name: 'age',
    title: 'Selecciona una edad :',
    options: [
      { title: 'NIÑO', type: 'CHILD' },
      { title: 'ADULTO', type: 'ADULT' },
    ],
  },
};
