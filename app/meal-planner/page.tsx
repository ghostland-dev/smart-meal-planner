"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, Calendar, Zap, Heart, AlertTriangle, CheckCircle, RefreshCw, Download, Share } from "lucide-react"
import { MealPlanCard } from "@/components/meal-plan-card"
import { NutritionalAnalysis } from "@/components/nutritional-analysis"
import { AIRecommendations } from "@/components/ai-recommendations"

interface MealPlan {
  id: string
  name: string
  description: string
  duration: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  sugar: number
  meals: {
    day: string
    breakfast: Meal
    lunch: Meal
    dinner: Meal
    snacks: Meal[]
  }[]
  medicalCompliance: {
    neuropathyFriendly: boolean
    diabeticSafe: boolean
    allergenFree: string[]
  }
  aiScore: number
  generatedAt: Date
}

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

export default function MealPlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentPlan, setCurrentPlan] = useState<MealPlan | null>(null)
  const [planDuration, setPlanDuration] = useState("7")
  const [calorieTarget, setCalorieTarget] = useState([2000])
  const [mealComplexity, setMealComplexity] = useState("moyen")
  const [dietaryFocus, setDietaryFocus] = useState("balanced")

  // Mock user medical profile
  const userProfile = {
    hasNeuropathy: true,
    neuropathyType: "diabetic",
    hasDiabetes: true,
    diabetesType: "type2",
    allergies: ["Gluten", "Lactose"],
    medications: ["Metformine", "Gabapentine"],
  }

  const generateMealPlan = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    const steps = [
      "Analyse de votre profil médical...",
      "Calcul des besoins nutritionnels...",
      "Sélection d'aliments compatibles...",
      "Génération des recettes...",
      "Optimisation nutritionnelle...",
      "Validation médicale...",
      "Finalisation du programme...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    // Mock generated meal plan
    const mockPlan: MealPlan = {
      id: "plan-" + Date.now(),
      name: "Programme Neuropathie & Diabète",
      description: "Plan personnalisé pour la gestion de la neuropathie diabétique avec contrôle glycémique optimal",
      duration: `${planDuration} jours`,
      calories: calorieTarget[0],
      protein: 120,
      carbs: 180,
      fat: 65,
      fiber: 35,
      sodium: 1800,
      sugar: 45,
      meals: Array.from({ length: Number.parseInt(planDuration) }, (_, i) => ({
        day: `Jour ${i + 1}`,
        breakfast: {
          id: `breakfast-${i}`,
          name: "Porridge aux myrtilles et noix",
          description: "Avoine complète, myrtilles fraîches, noix, cannelle",
          calories: 320,
          protein: 12,
          carbs: 45,
          fat: 8,
          fiber: 8,
          sodium: 150,
          prepTime: 10,
          difficulty: "facile",
          ingredients: ["Flocons d'avoine", "Myrtilles", "Noix", "Cannelle", "Lait d'amande"],
          instructions: ["Faire cuire l'avoine", "Ajouter les myrtilles", "Garnir de noix"],
          tags: ["Sans gluten", "Diabète-friendly", "Anti-inflammatoire"],
        },
        lunch: {
          id: `lunch-${i}`,
          name: "Saumon grillé aux légumes verts",
          description: "Filet de saumon, brocolis, épinards, quinoa",
          calories: 450,
          protein: 35,
          carbs: 30,
          fat: 18,
          fiber: 6,
          sodium: 400,
          prepTime: 25,
          difficulty: "moyen",
          ingredients: ["Saumon", "Brocolis", "Épinards", "Quinoa", "Huile d'olive"],
          instructions: ["Griller le saumon", "Cuire les légumes à la vapeur", "Préparer le quinoa"],
          tags: ["Oméga-3", "Neuroprotecteur", "Faible IG"],
        },
        dinner: {
          id: `dinner-${i}`,
          name: "Poulet aux herbes et légumes rôtis",
          description: "Blanc de poulet, courgettes, poivrons, herbes de Provence",
          calories: 380,
          protein: 32,
          carbs: 20,
          fat: 15,
          fiber: 5,
          sodium: 350,
          prepTime: 35,
          difficulty: "moyen",
          ingredients: ["Blanc de poulet", "Courgettes", "Poivrons", "Herbes de Provence"],
          instructions: ["Mariner le poulet", "Rôtir les légumes", "Cuire le poulet"],
          tags: ["Protéines maigres", "Antioxydants", "Faible sodium"],
        },
        snacks: [
          {
            id: `snack-${i}`,
            name: "Amandes et pomme",
            description: "Portion contrôlée d'amandes avec pomme verte",
            calories: 150,
            protein: 6,
            carbs: 15,
            fat: 9,
            fiber: 4,
            sodium: 0,
            prepTime: 2,
            difficulty: "facile",
            ingredients: ["Amandes", "Pomme verte"],
            instructions: ["Servir ensemble"],
            tags: ["Collation saine", "Fibres", "Magnésium"],
          },
        ],
      })),
      medicalCompliance: {
        neuropathyFriendly: true,
        diabeticSafe: true,
        allergenFree: ["Gluten", "Lactose"],
      },
      aiScore: 94,
      generatedAt: new Date(),
    }

    setCurrentPlan(mockPlan)
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Planificateur IA</h1>
                <p className="text-sm text-muted-foreground">Génération intelligente de programmes alimentaires</p>
              </div>
            </div>
            {currentPlan && (
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
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Configuration IA
                </CardTitle>
                <CardDescription>Personnalisez votre programme alimentaire</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Durée du programme</Label>
                  <Select value={planDuration} onValueChange={setPlanDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 jours</SelectItem>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="14">14 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Objectif calorique quotidien: {calorieTarget[0]} kcal</Label>
                  <Slider
                    value={calorieTarget}
                    onValueChange={setCalorieTarget}
                    max={3000}
                    min={1200}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1200</span>
                    <span>3000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Complexité des repas</Label>
                  <Select value={mealComplexity} onValueChange={setMealComplexity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facile">Facile (10-15 min)</SelectItem>
                      <SelectItem value="moyen">Moyen (20-30 min)</SelectItem>
                      <SelectItem value="difficile">Élaboré (30+ min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Focus nutritionnel</Label>
                  <Select value={dietaryFocus} onValueChange={setDietaryFocus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Équilibré</SelectItem>
                      <SelectItem value="low-carb">Faible en glucides</SelectItem>
                      <SelectItem value="high-protein">Riche en protéines</SelectItem>
                      <SelectItem value="anti-inflammatory">Anti-inflammatoire</SelectItem>
                      <SelectItem value="neuropathy">Spécial neuropathie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateMealPlan} disabled={isGenerating} className="w-full" size="lg">
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Générer le programme
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="space-y-2">
                    <Progress value={generationProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center">
                      {generationProgress < 100 ? "Analyse en cours..." : "Finalisation..."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical Compliance */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Conformité médicale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Neuropathie</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Compatible
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Diabète Type 2</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Optimisé
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Allergies</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Sans gluten/lactose
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Médicaments</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Interactions vérifiées
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {!currentPlan && !isGenerating && (
              <Card className="border-border h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Prêt à générer votre programme ?</h3>
                  <p className="text-muted-foreground mb-4">
                    Configurez vos préférences et laissez notre IA créer un programme alimentaire personnalisé
                  </p>
                  <Button onClick={generateMealPlan}>
                    <Brain className="w-4 h-4 mr-2" />
                    Commencer la génération
                  </Button>
                </CardContent>
              </Card>
            )}

            {isGenerating && (
              <Card className="border-border h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Génération en cours...</h3>
                  <p className="text-muted-foreground mb-4">
                    Notre IA analyse vos contraintes médicales et crée votre programme personnalisé
                  </p>
                  <Progress value={generationProgress} className="w-64 mx-auto" />
                </CardContent>
              </Card>
            )}

            {currentPlan && (
              <div className="space-y-6">
                {/* Plan Overview */}
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          {currentPlan.name}
                        </CardTitle>
                        <CardDescription>{currentPlan.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Score IA: {currentPlan.aiScore}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{currentPlan.calories}</div>
                        <div className="text-xs text-muted-foreground">kcal/jour</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{currentPlan.protein}g</div>
                        <div className="text-xs text-muted-foreground">Protéines</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{currentPlan.carbs}g</div>
                        <div className="text-xs text-muted-foreground">Glucides</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{currentPlan.fiber}g</div>
                        <div className="text-xs text-muted-foreground">Fibres</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs for different views */}
                <Tabs defaultValue="meals" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="meals">Programme des repas</TabsTrigger>
                    <TabsTrigger value="nutrition">Analyse nutritionnelle</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommandations IA</TabsTrigger>
                  </TabsList>

                  <TabsContent value="meals" className="space-y-4">
                    {currentPlan.meals.map((dayPlan, index) => (
                      <MealPlanCard key={index} dayPlan={dayPlan} />
                    ))}
                  </TabsContent>

                  <TabsContent value="nutrition">
                    <NutritionalAnalysis plan={currentPlan} />
                  </TabsContent>

                  <TabsContent value="recommendations">
                    <AIRecommendations plan={currentPlan} userProfile={userProfile} />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
