import { UUID } from '.';

export type CategoryConfigItem = {
  id: UUID;
  name: string;
  icon: string | null;
};

export interface CategoryConfigResponse {
  categories: CategoryConfigItem[];
}
