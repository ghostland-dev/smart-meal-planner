"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingDown, ExternalLink, MapPin } from "lucide-react"

interface ShoppingItem {
  id: string
  name: string
  quantity: number
  unit: string
}

interface Store {
  id: string
  name: string
  logo: string
  distance: number
  totalPrice: number
  savings: number
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
  }[]
}

interface PriceComparisonTableProps {
  items: ShoppingItem[]
  stores: Store[]
  priceData: PriceData[]
}

export function PriceComparisonTable({ items, stores, priceData }: PriceComparisonTableProps) {
  const getStoreTotal = (storeId: string) => {
    return stores.find((s) => s.id === storeId)?.totalPrice || 0
  }

  const getStoreSavings = (storeId: string) => {
    return stores.find((s) => s.id === storeId)?.savings || 0
  }

  const getBestPriceStore = () => {
    return stores.reduce((best, current) => (current.totalPrice < best.totalPrice ? current : best))
  }

  const bestStore = getBestPriceStore()

  return (
    <div className="space-y-4">
      {/* Store Comparison Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stores.map((store) => (
          <Card
            key={store.id}
            className={`border-border ${store.id === bestStore.id ? "ring-2 ring-primary ring-opacity-50" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={store.logo || "/placeholder.svg"} alt={store.name} className="w-8 h-8" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{store.name}</h4>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {store.distance}km
                  </div>
                </div>
                {store.id === bestStore.id && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Meilleur prix
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="font-semibold text-foreground">{store.totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Économies:</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    {store.savings.toFixed(2)}€
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                <ExternalLink className="w-3 h-3 mr-2" />
                Voir en ligne
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Price Comparison */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Comparaison détaillée par article</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Article</th>
                  {stores.map((store) => (
                    <th key={store.id} className="text-center py-3 px-2 font-medium text-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <img src={store.logo || "/placeholder.svg"} alt={store.name} className="w-5 h-5" />
                        <span className="hidden sm:inline">{store.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 3).map((item) => {
                  const itemPriceData = priceData.find((p) => p.itemId === item.id)
                  const bestPrice = itemPriceData?.stores.reduce((best, current) =>
                    current.price < best.price ? current : best,
                  )

                  return (
                    <tr key={item.id} className="border-b border-border/50">
                      <td className="py-3 px-2">
                        <div>
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.quantity}
                            {item.unit}
                          </div>
                        </div>
                      </td>
                      {stores.map((store) => {
                        const storePrice = itemPriceData?.stores.find((s) => s.storeId === store.id)
                        const isBestPrice = storePrice?.storeId === bestPrice?.storeId
                        const hasPromotion = storePrice?.promotion

                        return (
                          <td key={store.id} className="py-3 px-2 text-center">
                            {storePrice ? (
                              <div className="space-y-1">
                                <div
                                  className={`font-medium ${
                                    isBestPrice ? "text-green-600" : "text-foreground"
                                  } flex items-center justify-center gap-1`}
                                >
                                  {isBestPrice && <TrendingDown className="w-3 h-3" />}
                                  {storePrice.price.toFixed(2)}€
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {storePrice.pricePerUnit.toFixed(2)}€/{item.unit}
                                </div>
                                {hasPromotion && (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200 text-xs"
                                  >
                                    -{hasPromotion.discount}%
                                  </Badge>
                                )}
                                {!storePrice.inStock && (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                                    Rupture
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">N/A</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">
              Prix mis à jour il y a 5 minutes • Données en temps réel
            </div>
            <div className="text-xs text-muted-foreground">
              Les prix peuvent varier selon la disponibilité et les promotions en cours
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
