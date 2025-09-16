"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, MapPin, TrendingDown, Euro, Navigation, Filter, Download, Share, Plus } from "lucide-react"
import { ShoppingListCard } from "@/components/shopping-list-card"
import { PriceComparisonTable } from "@/components/price-comparison-table"

interface ShoppingItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  priority: "essential" | "recommended" | "optional"
  alternatives: string[]
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

interface Store {
  id: string
  name: string
  logo: string
  distance: number
  rating: number
  openUntil: string
  totalPrice: number
  savings: number
  deliveryAvailable: boolean
  clickAndCollect: boolean
}

interface PriceData {
  itemId: string
  itemName: string
  stores: {
    storeId: string
    storeName: string
    price: number
    pricePerUnit: number
    inStock: boolean
    promotion?: {
      type: string
      discount: number
      validUntil: string
    }
    priceHistory: { date: string; price: number }[]
  }[]
}

export default function ShoppingPage() {
  const [activeList, setActiveList] = useState("current")
  const [selectedStores, setSelectedStores] = useState<string[]>(["carrefour", "leclerc", "auchan"])
  const [sortBy, setSortBy] = useState("total-price")
  const [maxDistance, setMaxDistance] = useState(10)
  const [showOnlyInStock, setShowOnlyInStock] = useState(true)

  // Mock shopping list generated from meal plan
  const shoppingList: ShoppingItem[] = [
    {
      id: "1",
      name: "Saumon frais (filet)",
      category: "Poissons",
      quantity: 800,
      unit: "g",
      priority: "essential",
      alternatives: ["Truite", "Cabillaud"],
      nutritionalInfo: { calories: 208, protein: 25, carbs: 0, fat: 12 },
    },
    {
      id: "2",
      name: "Brocolis frais",
      category: "Légumes",
      quantity: 500,
      unit: "g",
      priority: "essential",
      alternatives: ["Chou-fleur", "Épinards"],
      nutritionalInfo: { calories: 34, protein: 3, carbs: 7, fat: 0 },
    },
    {
      id: "3",
      name: "Quinoa bio",
      category: "Céréales",
      quantity: 500,
      unit: "g",
      priority: "essential",
      alternatives: ["Riz complet", "Boulgour"],
      nutritionalInfo: { calories: 368, protein: 14, carbs: 64, fat: 6 },
    },
    {
      id: "4",
      name: "Myrtilles fraîches",
      category: "Fruits",
      quantity: 250,
      unit: "g",
      priority: "recommended",
      alternatives: ["Framboises", "Mûres"],
      nutritionalInfo: { calories: 57, protein: 1, carbs: 14, fat: 0 },
    },
    {
      id: "5",
      name: "Amandes non salées",
      category: "Fruits secs",
      quantity: 200,
      unit: "g",
      priority: "recommended",
      alternatives: ["Noix", "Noisettes"],
      nutritionalInfo: { calories: 579, protein: 21, carbs: 22, fat: 50 },
    },
    {
      id: "6",
      name: "Huile d'olive extra vierge",
      category: "Huiles",
      quantity: 500,
      unit: "ml",
      priority: "essential",
      alternatives: ["Huile de colza", "Huile d'avocat"],
      nutritionalInfo: { calories: 884, protein: 0, carbs: 0, fat: 100 },
    },
  ]

  // Mock stores data
  const stores: Store[] = [
    {
      id: "carrefour",
      name: "Carrefour",
      logo: "/carrefour-logo.png",
      distance: 2.3,
      rating: 4.2,
      openUntil: "22:00",
      totalPrice: 47.85,
      savings: 8.32,
      deliveryAvailable: true,
      clickAndCollect: true,
    },
    {
      id: "leclerc",
      name: "E.Leclerc",
      logo: "/leclerc-logo.png",
      distance: 3.1,
      rating: 4.0,
      openUntil: "21:30",
      totalPrice: 44.2,
      savings: 11.97,
      deliveryAvailable: true,
      clickAndCollect: true,
    },
    {
      id: "auchan",
      name: "Auchan",
      logo: "/auchan-logo.png",
      distance: 5.2,
      rating: 3.8,
      openUntil: "21:00",
      totalPrice: 49.15,
      savings: 6.02,
      deliveryAvailable: false,
      clickAndCollect: true,
    },
    {
      id: "intermarche",
      name: "Intermarché",
      logo: "/intermarche-logo.png",
      distance: 1.8,
      rating: 4.1,
      openUntil: "20:00",
      totalPrice: 46.9,
      savings: 9.27,
      deliveryAvailable: false,
      clickAndCollect: false,
    },
  ]

  // Mock price comparison data
  const priceData: PriceData[] = [
    {
      itemId: "1",
      itemName: "Saumon frais (filet)",
      stores: [
        {
          storeId: "carrefour",
          storeName: "Carrefour",
          price: 15.92,
          pricePerUnit: 19.9,
          inStock: true,
          promotion: { type: "discount", discount: 15, validUntil: "2024-12-31" },
          priceHistory: [
            { date: "2024-01-01", price: 18.5 },
            { date: "2024-01-15", price: 17.2 },
            { date: "2024-02-01", price: 19.9 },
          ],
        },
        {
          storeId: "leclerc",
          storeName: "E.Leclerc",
          price: 14.4,
          pricePerUnit: 18.0,
          inStock: true,
          priceHistory: [
            { date: "2024-01-01", price: 17.6 },
            { date: "2024-01-15", price: 18.0 },
            { date: "2024-02-01", price: 18.0 },
          ],
        },
        {
          storeId: "auchan",
          storeName: "Auchan",
          price: 16.8,
          pricePerUnit: 21.0,
          inStock: true,
          priceHistory: [
            { date: "2024-01-01", price: 20.0 },
            { date: "2024-01-15", price: 21.0 },
            { date: "2024-02-01", price: 21.0 },
          ],
        },
      ],
    },
  ]

  const totalSavings = stores.reduce((sum, store) => sum + store.savings, 0) / stores.length
  const bestStore = stores.reduce((best, current) => (current.totalPrice < best.totalPrice ? current : best))

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    // Update quantity logic here
    console.log(`[v0] Updating quantity for item ${itemId} to ${newQuantity}`)
  }

  const handleStoreToggle = (storeId: string) => {
    setSelectedStores((prev) => (prev.includes(storeId) ? prev.filter((id) => id !== storeId) : [...prev, storeId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Liste de courses intelligente</h1>
                <p className="text-sm text-muted-foreground">Comparaison de prix en temps réel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{shoppingList.length}</div>
                  <div className="text-xs text-muted-foreground">Articles</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{bestStore.totalPrice.toFixed(2)}€</div>
                  <div className="text-xs text-muted-foreground">Meilleur prix</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{totalSavings.toFixed(2)}€</div>
                  <div className="text-xs text-muted-foreground">Économies moyennes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{bestStore.distance}km</div>
                  <div className="text-xs text-muted-foreground">Magasin le plus proche</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shopping List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Ma liste de courses
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un article
                  </Button>
                </div>
                <CardDescription>Générée automatiquement depuis votre programme alimentaire</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shoppingList.map((item) => (
                    <ShoppingListCard
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      priceData={priceData.find((p) => p.itemId === item.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Comparison */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  Comparaison des prix
                </CardTitle>
                <CardDescription>Prix en temps réel dans les magasins sélectionnés</CardDescription>
              </CardHeader>
              <CardContent>
                <PriceComparisonTable items={shoppingList} stores={stores} priceData={priceData} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Store Selection */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filtres et options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Magasins à comparer</Label>
                  <div className="space-y-2">
                    {stores.map((store) => (
                      <div key={store.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={store.id}
                          checked={selectedStores.includes(store.id)}
                          onCheckedChange={() => handleStoreToggle(store.id)}
                        />
                        <Label htmlFor={store.id} className="text-sm flex items-center gap-2">
                          <img src={store.logo || "/placeholder.svg"} alt={store.name} className="w-4 h-4" />
                          {store.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Trier par</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total-price">Prix total</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="savings">Économies</SelectItem>
                      <SelectItem value="rating">Note client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Distance maximale: {maxDistance}km</Label>
                  <Input
                    type="range"
                    min="1"
                    max="20"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="inStock" checked={showOnlyInStock} onCheckedChange={setShowOnlyInStock} />
                  <Label htmlFor="inStock" className="text-sm">
                    Uniquement les articles en stock
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Best Deals */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  Meilleures offres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-800">Saumon frais</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      -15%
                    </Badge>
                  </div>
                  <div className="text-xs text-green-600">E.Leclerc • 14,40€ au lieu de 16,92€</div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-800">Quinoa bio</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                      2+1
                    </Badge>
                  </div>
                  <div className="text-xs text-blue-600">Carrefour • Offre spéciale jusqu'au 31/12</div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-yellow-800">Myrtilles</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                      Prix bas
                    </Badge>
                  </div>
                  <div className="text-xs text-yellow-600">Intermarché • 3,20€/250g</div>
                </div>
              </CardContent>
            </Card>

            {/* Store Recommendations */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  Recommandation magasin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={bestStore.logo || "/placeholder.svg"} alt={bestStore.name} className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium text-foreground">{bestStore.name}</h4>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {bestStore.distance}km • Ouvert jusqu'à {bestStore.openUntil}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prix total:</span>
                      <span className="font-medium text-foreground">{bestStore.totalPrice.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Économies:</span>
                      <span className="font-medium text-green-600">-{bestStore.savings.toFixed(2)}€</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {bestStore.deliveryAvailable && (
                      <Badge variant="outline" className="text-xs">
                        Livraison
                      </Badge>
                    )}
                    {bestStore.clickAndCollect && (
                      <Badge variant="outline" className="text-xs">
                        Click & Collect
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full mt-3" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Itinéraire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
