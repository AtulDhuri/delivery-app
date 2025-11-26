class Package {
  constructor(
    public baseCost: number,
    public weight: number,
    public distance: number,
    public offerCode: string | null = null,
    public pkgId: string | null = null
  ) {}
}

export { Package };