"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Heart, Edit, Shield } from "lucide-react"

interface MedicalProfileCardProps {
  hasNeuropathy?: boolean
  neuropathyType?: string
  neuropathySeverity?: string
  hasDiabetes?: boolean
  diabetesType?: string
  diabetesControl?: string
  allergies?: string[]
  medications?: string
  onEdit?: () => void
}

export function MedicalProfileCard({
  hasNeuropathy = false,
  neuropathyType,
  neuropathySeverity,
  hasDiabetes = false,
  diabetesType,
  diabetesControl,
  allergies = [],
  medications,
  onEdit,
}: MedicalProfileCardProps) {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "severe":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getControlColor = (control?: string) => {
    switch (control) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Profil médical</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Neuropathy */}
        {hasNeuropathy && (
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-secondary" />
              <h4 className="font-medium text-foreground">Neuropathie</h4>
            </div>
            <div className="space-y-2">
              {neuropathyType && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="outline">{neuropathyType}</Badge>
                </div>
              )}
              {neuropathySeverity && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sévérité:</span>
                  <Badge className={getSeverityColor(neuropathySeverity)}>
                    {neuropathySeverity === "mild"
                      ? "Légère"
                      : neuropathySeverity === "moderate"
                        ? "Modérée"
                        : "Sévère"}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Diabetes */}
        {hasDiabetes && (
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-primary" />
              <h4 className="font-medium text-foreground">Diabète</h4>
            </div>
            <div className="space-y-2">
              {diabetesType && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="outline">
                    {diabetesType === "type1" ? "Type 1" : diabetesType === "type2" ? "Type 2" : "Gestationnel"}
                  </Badge>
                </div>
              )}
              {diabetesControl && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Contrôle:</span>
                  <Badge className={getControlColor(diabetesControl)}>
                    {diabetesControl === "excellent"
                      ? "Excellent"
                      : diabetesControl === "good"
                        ? "Bon"
                        : diabetesControl === "fair"
                          ? "Moyen"
                          : "Difficile"}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Allergies */}
        {allergies.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Allergies alimentaires</h4>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy) => (
                <Badge key={allergy} variant="destructive" className="text-xs">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Medications */}
        {medications && (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Médicaments</h4>
            <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">{medications}</p>
          </div>
        )}

        {!hasNeuropathy && !hasDiabetes && allergies.length === 0 && !medications && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">Aucune contrainte médicale renseignée</p>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={onEdit}>
              Ajouter des informations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
