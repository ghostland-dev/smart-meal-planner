import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Lightbulb, TrendingUp, AlertTriangle, Heart, Zap } from "lucide-react"

interface MealPlan {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  aiScore: number
}

interface UserProfile {
  hasNeuropathy: boolean
  neuropathyType: string
  hasDiabetes: boolean
  diabetesType: string
  allergies: string[]
  medications: string[]
}

interface AIRecommendationsProps {
  plan: MealPlan
  userProfile: UserProfile
}

export function AIRecommendations({ plan, userProfile }: AIRecommendationsProps) {
  const recommendations = [
    {
      type: "optimization",
      priority: "high",
      title: "Optimisation glycémique",
      description: "Remplacer le quinoa du déjeuner par du riz basmati pour un index glycémique plus bas",
      impact: "+3 points de score IA",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      type: "medical",
      priority: "medium",
      title: "Support neuropathique",
      description: "Ajouter des graines de lin riches en ALA pour renforcer la neuroprotection",
      impact: "Amélioration des symptômes",
      icon: Heart,
      color: "text-green-600",
    },
    {
      type: "nutrition",
      priority: "medium",
      title: "Équilibre minéral",
      description: "Augmenter l'apport en magnésium avec des épinards et amandes",
      impact: "Meilleur contrôle nerveux",
      icon: Zap,
      color: "text-purple-600",
    },
    {
      type: "warning",
      priority: "low",
      title: "Interaction médicamenteuse",
      description: "Éviter les pamplemousses qui peuvent interférer avec la Metformine",
      impact: "Prévention d'effets indésirables",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
  ]

  const insights = [
    {
      title: "Profil métabolique",
      value: "Optimal",
      description: "Votre plan respecte parfaitement vos besoins énergétiques et contraintes médicales",
      trend: "stable",
    },
    {
      title: "Variété nutritionnelle",
      value: "87%",
      description: "Excellente diversité d'aliments pour couvrir tous les micronutriments essentiels",
      trend: "up",
    },
    {
      title: "Compliance médicale",
      value: "94%",
      description: "Très haute conformité avec les recommandations pour la neuropathie diabétique",
      trend: "up",
    },
    {
      title: "Facilité d'exécution",
      value: "Moyenne",
      description: "Temps de préparation équilibré, quelques recettes peuvent être simplifiées",
      trend: "stable",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Score Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Score IA et analyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-foreground">{plan.aiScore}/100</div>
              <div className="text-sm text-muted-foreground">Score de compatibilité IA</div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-lg px-3 py-1">
              Excellent
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{insight.value}</span>
                  {getTrendIcon(insight.trend)}
                </div>
                <div className="text-xs font-medium text-foreground mb-1">{insight.title}</div>
                <div className="text-xs text-muted-foreground">{insight.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Recommandations personnalisées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon
            return (
              <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                <div className={`p-2 rounded-lg bg-background ${rec.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <Badge className={getPriorityColor(rec.priority)} variant="outline">
                      {rec.priority === "high"
                        ? "Priorité haute"
                        : rec.priority === "medium"
                          ? "Priorité moyenne"
                          : "Priorité basse"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">{rec.impact}</span>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Appliquer
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Medical Insights */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Insights médicaux
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Points forts de votre plan</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Index glycémique contrôlé pour votre diabète de type 2</li>
                <li>• Aliments anti-inflammatoires pour la neuropathie</li>
                <li>• Apport optimal en vitamines B pour la santé nerveuse</li>
                <li>• Exclusion complète des allergènes identifiés</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Opportunités d'amélioration</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Augmenter les oméga-3 pour la neuroprotection</li>
                <li>• Ajouter plus d'antioxydants (baies, légumes colorés)</li>
                <li>• Optimiser l'espacement des repas pour la glycémie</li>
                <li>• Intégrer des probiotiques pour la santé digestive</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Tips */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Conseils personnalisés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2" />
              <div>
                <h5 className="font-medium text-foreground">Timing des repas</h5>
                <p className="text-sm text-muted-foreground">
                  Espacez vos repas de 3-4h pour maintenir une glycémie stable avec votre traitement Metformine
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2" />
              <div>
                <h5 className="font-medium text-foreground">Hydratation</h5>
                <p className="text-sm text-muted-foreground">
                  Buvez 2-3L d'eau par jour pour soutenir la fonction rénale et l'élimination des toxines
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2" />
              <div>
                <h5 className="font-medium text-foreground">Activité physique</h5>
                <p className="text-sm text-muted-foreground">
                  Une marche de 15-20 minutes après les repas améliore l'absorption du glucose
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
