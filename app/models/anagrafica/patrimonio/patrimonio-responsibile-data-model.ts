import {GenericDescriptionValueModel} from "../../generic-description-value-model";

export interface PatrimonioResponsibileDataModel{
  altro1?: string;
  altro2?: string;
  note?: string;
  patrimonioRichiedenti?: GenericDescriptionValueModel[];
  patrimonioGaranti?: GenericDescriptionValueModel[];
}
