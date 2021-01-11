export interface Cargonaut {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  birthday?: Date;
  avgRating?: number;
  account_holder?: string;
  iban?: string;
  bic?: string;
  image?: string | ArrayBuffer; // use for ratings if wanted
}
