type FieldFormProps = {
  name: string;
  title: string;
  option: Option[];
};

interface Option {
  type: string;
  title: string;
}

interface DropdownInputProps {
  title: string;
  options: Option[];
  name: string;
}
