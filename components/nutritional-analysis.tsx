"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react"

interface MealPlan {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  sugar: number
}

interface NutritionalAnalysisProps {
  plan: MealPlan
}

export function NutritionalAnalysis({ plan }: NutritionalAnalysisProps) {
  // Recommended daily values for diabetic/neuropathy patients
  const recommendations = {
    calories: { min: 1800, max: 2200, target: 2000 },
    protein: { min: 100, max: 140, target: 120 },
    carbs: { min: 150, max: 200, target: 175 },
    fat: { min: 50, max: 80, target: 65 },
    fiber: { min: 30, max: 40, target: 35 },
    sodium: { min: 0, max: 2000, target: 1500 },
    sugar: { min: 0, max: 50, target: 25 },
  }

  const macroData = [
    {
      name: "Protéines",
      value: plan.protein,
      color: "#0891b2",
      percentage: (((plan.protein * 4) / plan.calories) * 100).toFixed(1),
    },
    {
      name: "Glucides",
      value: plan.carbs,
      color: "#f97316",
      percentage: (((plan.carbs * 4) / plan.calories) * 100).toFixed(1),
    },
    {
      name: "Lipides",
      value: plan.fat,
      color: "#84cc16",
      percentage: (((plan.fat * 9) / plan.calories) * 100).toFixed(1),
    },
  ]

  const weeklyTrends = [
    { day: "Lun", calories: 1950, protein: 118, carbs: 175, fat: 62 },
    { day: "Mar", calories: 2020, protein: 125, carbs: 180, fat: 68 },
    { day: "Mer", calories: 1980, protein: 120, carbs: 178, fat: 65 },
    { day: "Jeu", calories: 2050, protein: 128, carbs: 185, fat: 70 },
    { day: "Ven", calories: 1920, protein: 115, carbs: 172, fat: 60 },
    { day: "Sam", calories: 2100, protein: 132, carbs: 190, fat: 72 },
    { day: "Dim", calories: 1980, protein: 122, carbs: 176, fat: 66 },
  ]

  const getComplianceStatus = (value: number, rec: { min: number; max: number; target: number }) => {
    if (value >= rec.min && value <= rec.max) {
      return { status: "optimal", color: "text-green-600", icon: CheckCircle }
    } else if (value < rec.min || value > rec.max) {
      return { status: "attention", color: "text-yellow-600", icon: AlertTriangle }
    } else {
      return { status: "target", color: "text-blue-600", icon: Target }
    }
  }

  const NutrientCard = ({
    name,
    value,
    unit,
    recommendation,
    description,
  }: {
    name: string
    value: number
    unit: string
    recommendation: { min: number; max: number; target: number }
    description: string
  }) => {
    const compliance = getComplianceStatus(value, recommendation)
    const percentage = Math.min((value / recommendation.target) * 100, 100)
    const Icon = compliance.icon

    return (
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">{name}</h4>
            <Icon className={`w-4 h-4 ${compliance.color}`} />
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>

          <Progress value={percentage} className="h-2 mb-2" />

          <div className="text-xs text-muted-foreground mb-2">
            Cible: {recommendation.target}
            {unit} ({recommendation.min}-{recommendation.max}
            {unit})
          </div>

          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NutrientCard
          name="Calories"
          value={plan.calories}
          unit=" kcal"
          recommendation={recommendations.calories}
          description="Énergie totale adaptée à votre métabolisme et objectifs"
        />
        <NutrientCard
          name="Protéines"
          value={plan.protein}
          unit="g"
          recommendation={recommendations.protein}
          description="Essentielles pour la réparation nerveuse et musculaire"
        />
        <NutrientCard
          name="Glucides"
          value={plan.carbs}
          unit="g"
          recommendation={recommendations.carbs}
          description="Contrôlés pour une glycémie stable"
        />
        <NutrientCard
          name="Lipides"
          value={plan.fat}
          unit="g"
          recommendation={recommendations.fat}
          description="Oméga-3 privilégiés pour la neuroprotection"
        />
        <NutrientCard
          name="Fibres"
          value={plan.fiber}
          unit="g"
          recommendation={recommendations.fiber}
          description="Favorisent la santé digestive et glycémique"
        />
        <NutrientCard
          name="Sodium"
          value={plan.sodium}
          unit="mg"
          recommendation={recommendations.sodium}
          description="Limité pour la santé cardiovasculaire"
        />
      </div>

      {/* Macronutrient Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Répartition des macronutriments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}g`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {macroData.map((macro) => (
                <div key={macro.name} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                    <span className="text-sm font-medium text-foreground">{macro.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{macro.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Tendance hebdomadaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#0891b2" name="Calories" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Compliance */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Conformité médicale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Neuropathie diabétique</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Index glycémique moyen</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Faible
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aliments anti-inflammatoires</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    85%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Oméga-3 / Oméga-6</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Optimal
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Contrôle glycémique</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Charge glycémique</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Modérée
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fibres solubles</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Élevé
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interactions médicamenteuses</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Aucune
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
