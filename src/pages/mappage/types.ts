export interface PlaceParams {
  numOfRows: number;
  mapX?: number;
  mapY?: number;
  radius: number;
}
export interface PlaceType {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  dist: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  readcount: string;
  sigungucode: string;
  tel: string;
  title: string;
}

export interface MarkerType {
  position: any;
  title: string;
  image: any;
  map: any;
  setMap: any;
}
