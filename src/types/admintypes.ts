export type ColumnType = {
  id: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  created_at: string;
  last_signed_in: string;
  events: string;
  active: boolean;
  role: string;
  image: string;
};

export enum ViewType {
  DATA_TABLE = "data_table",
  MANUAL_CHECK_IN = "manual_check_in",
  MANUAL_ID_CARD = "manual_id_card",
}

export type IdCardProps = {
  id: string | undefined;
  name: string | undefined;
  photo: string | undefined;
  date: string | undefined;
  role: string | undefined;
};
