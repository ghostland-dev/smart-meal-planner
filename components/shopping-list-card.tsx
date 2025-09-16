"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus, TrendingDown, AlertCircle, Info } from "lucide-react"

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

interface ShoppingListCardProps {
  item: ShoppingItem
  onQuantityChange: (itemId: string, newQuantity: number) => void
  priceData?: PriceData
}

export function ShoppingListCard({ item, onQuantityChange, priceData }: ShoppingListCardProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [showAlternatives, setShowAlternatives] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "essential":
        return "bg-red-100 text-red-800 border-red-200"
      case "recommended":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "optional":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "essential":
        return "Essentiel"
      case "recommended":
        return "Recommandé"
      case "optional":
        return "Optionnel"
      default:
        return priority
    }
  }

  const bestPrice = priceData?.stores.reduce((best, current) => (current.price < best.price ? current : best))
  const hasPromotion = bestPrice?.promotion

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, item.quantity + delta)
    onQuantityChange(item.id, newQuantity)
  }

  return (
    <Card className={`border-border transition-all ${isChecked ? "opacity-60 bg-muted/30" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox checked={isChecked} onCheckedChange={setIsChecked} className="mt-1" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h4 className={`font-medium ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {item.name}
                </h4>
                <Badge className={getPriorityColor(item.priority)} variant="outline">
                  {getPriorityLabel(item.priority)}
                </Badge>
              </div>

              {bestPrice && (
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {hasPromotion && <TrendingDown className="w-4 h-4 text-green-600" />}
                    <span className="font-semibold text-foreground">{bestPrice.price.toFixed(2)}€</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {bestPrice.pricePerUnit.toFixed(2)}€/{item.unit}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-50)}
                    disabled={item.quantity <= 50}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <div className="flex items-center gap-1 min-w-0">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onQuantityChange(item.id, Number.parseInt(e.target.value) || 0)}
                      className="w-16 h-8 text-center text-sm"
                    />
                    <span className="text-sm text-muted-foreground">{item.unit}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleQuantityChange(50)} className="h-8 w-8 p-0">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>

              {hasPromotion && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  -{hasPromotion.discount}%
                </Badge>
              )}
            </div>

            {/* Nutritional Info */}
            {item.nutritionalInfo && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span>{item.nutritionalInfo.calories} kcal</span>
                <span>P: {item.nutritionalInfo.protein}g</span>
                <span>G: {item.nutritionalInfo.carbs}g</span>
                <span>L: {item.nutritionalInfo.fat}g</span>
              </div>
            )}

            {/* Alternatives */}
            {item.alternatives.length > 0 && (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="h-6 p-0 text-xs text-primary hover:text-primary/80"
                >
                  <Info className="w-3 h-3 mr-1" />
                  {showAlternatives ? "Masquer" : "Voir"} les alternatives ({item.alternatives.length})
                </Button>

                {showAlternatives && (
                  <div className="flex flex-wrap gap-1">
                    {item.alternatives.map((alt, index) => (
                      <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Stock Warning */}
            {priceData && !bestPrice?.inStock && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-800">Stock limité dans certains magasins</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
