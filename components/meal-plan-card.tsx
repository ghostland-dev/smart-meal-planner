import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ChefHat, Heart } from "lucide-react"

interface Meal {
  id: string
  name: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  prepTime: number
  difficulty: "facile" | "moyen" | "difficile"
  ingredients: string[]
  instructions: string[]
  tags: string[]
}

interface DayPlan {
  day: string
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snacks: Meal[]
}

interface MealPlanCardProps {
  dayPlan: DayPlan
}

export function MealPlanCard({ dayPlan }: MealPlanCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile":
        return "bg-green-100 text-green-800 border-green-200"
      case "moyen":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "difficile":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const MealCard = ({ meal, mealType }: { meal: Meal; mealType: string }) => (
    <div className="p-4 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-foreground">{meal.name}</h4>
        <Badge className={getDifficultyColor(meal.difficulty)} variant="outline">
          {meal.difficulty}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-3">{meal.description}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {meal.prepTime} min
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3" />
          {meal.calories} kcal
        </div>
        <div>
          P: {meal.protein}g | G: {meal.carbs}g | L: {meal.fat}g
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {meal.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full bg-transparent">
        <ChefHat className="w-3 h-3 mr-2" />
        Voir la recette
      </Button>
    </div>
  )

  const totalCalories =
    dayPlan.breakfast.calories +
    dayPlan.lunch.calories +
    dayPlan.dinner.calories +
    dayPlan.snacks.reduce((sum, snack) => sum + snack.calories, 0)

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{dayPlan.day}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {totalCalories} kcal total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Petit-déjeuner
            </h3>
            <MealCard meal={dayPlan.breakfast} mealType="breakfast" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Déjeuner
            </h3>
            <MealCard meal={dayPlan.lunch} mealType="lunch" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Dîner
            </h3>
            <MealCard meal={dayPlan.dinner} mealType="dinner" />
          </div>

          {dayPlan.snacks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Collations
              </h3>
              <div className="grid gap-2">
                {dayPlan.snacks.map((snack, index) => (
                  <MealCard key={index} meal={snack} mealType="snack" />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
