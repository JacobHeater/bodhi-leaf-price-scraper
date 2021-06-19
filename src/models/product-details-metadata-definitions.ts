import { IProductDetailsMetadataDefinition } from "./iproduct-details-metadata-definition";

abstract class MetadataDefinitionBase
  implements IProductDetailsMetadataDefinition
{
  abstract key: string;

  isMatch(input: string): boolean {
    return new RegExp(`(${this.key})\:(\s+)?`, "i").test(input);
  }
}

export class DescriptionMetadataDefinition extends MetadataDefinitionBase {
  key: string = "Description";
}
