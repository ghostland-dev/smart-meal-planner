"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, ArrowRight, ArrowLeft, Upload, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Informations personnelles", description: "Vos données de base" },
  { id: 2, title: "Contraintes médicales", description: "Pathologies et restrictions" },
  { id: 3, title: "Allergies et intolérances", description: "Aliments à éviter" },
  { id: 4, title: "Objectifs nutritionnels", description: "Vos buts santé" },
  { id: 5, title: "Protocoles existants", description: "Import de documents" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal info
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",

    // Medical constraints
    hasNeuropathy: false,
    neuropathyType: "",
    neuropathySeverity: "",
    hasDiabetes: false,
    diabetesType: "",
    diabetesControl: "",
    medications: "",

    // Allergies
    allergies: [] as string[],
    intolerances: [] as string[],
    customRestrictions: "",

    // Goals
    primaryGoal: "",
    targetWeight: "",
    dietaryPreferences: [] as string[],

    // Protocols
    hasExistingProtocol: false,
    protocolSource: "",
  })

  const progress = (currentStep / steps.length) * 100

  const commonAllergies = [
    "Gluten",
    "Lactose",
    "Œufs",
    "Fruits à coque",
    "Arachides",
    "Poissons",
    "Crustacés",
    "Soja",
    "Sésame",
    "Sulfites",
  ]

  const dietaryPreferences = [
    "Végétarien",
    "Végétalien",
    "Sans gluten",
    "Cétogène",
    "Méditerranéen",
    "DASH",
    "Pauvre en sodium",
    "Riche en fibres",
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAllergyToggle = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }))
  }

  const handlePreferenceToggle = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter((p) => p !== preference)
        : [...prev.dietaryPreferences, preference],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SmartMealPlanner</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Étape {currentStep} sur {steps.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Configuration de votre profil</h1>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complété</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center min-w-0">
              <div className={`flex items-center gap-2 ${index < steps.length - 1 ? "mr-4" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id < currentStep
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <div className="hidden sm:block">
                  <div
                    className={`text-sm font-medium ${
                      step.id === currentStep ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && <div className="w-8 h-px bg-border mx-2 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Âge</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="35"
                      value={formData.age}
                      onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sexe</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Homme</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Femme</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Autre</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Taille (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={formData.height}
                      onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Niveau d'activité physique</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, activityLevel: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre niveau d'activité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sédentaire (peu ou pas d'exercice)</SelectItem>
                      <SelectItem value="light">Légèrement actif (exercice léger 1-3 jours/semaine)</SelectItem>
                      <SelectItem value="moderate">Modérément actif (exercice modéré 3-5 jours/semaine)</SelectItem>
                      <SelectItem value="very">Très actif (exercice intense 6-7 jours/semaine)</SelectItem>
                      <SelectItem value="extra">Extrêmement actif (exercice très intense, travail physique)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Medical Constraints */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-secondary" />
                    <h3 className="font-semibold text-foreground">Neuropathie</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasNeuropathy"
                        checked={formData.hasNeuropathy}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, hasNeuropathy: !!checked }))}
                      />
                      <Label htmlFor="hasNeuropathy">Je souffre de neuropathie</Label>
                    </div>

                    {formData.hasNeuropathy && (
                      <div className="space-y-4 ml-6">
                        <div className="space-y-2">
                          <Label>Type de neuropathie</Label>
                          <Select
                            value={formData.neuropathyType}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, neuropathyType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="diabetic">Neuropathie diabétique</SelectItem>
                              <SelectItem value="peripheral">Neuropathie périphérique</SelectItem>
                              <SelectItem value="autonomic">Neuropathie autonome</SelectItem>
                              <SelectItem value="focal">Neuropathie focale</SelectItem>
                              <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Sévérité</Label>
                          <RadioGroup
                            value={formData.neuropathySeverity}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, neuropathySeverity: value }))}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mild" id="mild" />
                              <Label htmlFor="mild">Légère</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="moderate" id="moderate" />
                              <Label htmlFor="moderate">Modérée</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="severe" id="severe" />
                              <Label htmlFor="severe">Sévère</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-secondary" />
                    <h3 className="font-semibold text-foreground">Diabète</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasDiabetes"
                        checked={formData.hasDiabetes}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, hasDiabetes: !!checked }))}
                      />
                      <Label htmlFor="hasDiabetes">Je souffre de diabète</Label>
                    </div>

                    {formData.hasDiabetes && (
                      <div className="space-y-4 ml-6">
                        <div className="space-y-2">
                          <Label>Type de diabète</Label>
                          <RadioGroup
                            value={formData.diabetesType}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, diabetesType: value }))}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="type1" id="type1" />
                              <Label htmlFor="type1">Type 1</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="type2" id="type2" />
                              <Label htmlFor="type2">Type 2</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="gestational" id="gestational" />
                              <Label htmlFor="gestational">Gestationnel</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>Contrôle glycémique</Label>
                          <Select
                            value={formData.diabetesControl}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, diabetesControl: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Évaluez votre contrôle" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent (HbA1c &lt; 7%)</SelectItem>
                              <SelectItem value="good">Bon (HbA1c 7-8%)</SelectItem>
                              <SelectItem value="fair">Moyen (HbA1c 8-9%)</SelectItem>
                              <SelectItem value="poor">Difficile (HbA1c &gt; 9%)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Médicaments actuels</Label>
                  <Textarea
                    id="medications"
                    placeholder="Listez vos médicaments actuels et leurs dosages..."
                    value={formData.medications}
                    onChange={(e) => setFormData((prev) => ({ ...prev, medications: e.target.value }))}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Ces informations nous aident à éviter les interactions alimentaires
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Allergies and Intolerances */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Allergies alimentaires</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonAllergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={formData.allergies.includes(allergy)}
                          onCheckedChange={() => handleAllergyToggle(allergy)}
                        />
                        <Label htmlFor={allergy} className="text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customRestrictions">Autres restrictions alimentaires</Label>
                  <Textarea
                    id="customRestrictions"
                    placeholder="Décrivez toute autre restriction alimentaire, intolérance ou préférence..."
                    value={formData.customRestrictions}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customRestrictions: e.target.value }))}
                    rows={3}
                  />
                </div>

                {formData.allergies.length > 0 && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Allergies sélectionnées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Nutritional Goals */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Objectif principal</Label>
                  <RadioGroup
                    value={formData.primaryGoal}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, primaryGoal: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weight-loss" id="weight-loss" />
                      <Label htmlFor="weight-loss">Perte de poids</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weight-gain" id="weight-gain" />
                      <Label htmlFor="weight-gain">Prise de poids</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maintenance" id="maintenance" />
                      <Label htmlFor="maintenance">Maintien du poids</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="health" id="health" />
                      <Label htmlFor="health">Amélioration de la santé</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="muscle" id="muscle" />
                      <Label htmlFor="muscle">Prise de masse musculaire</Label>
                    </div>
                  </RadioGroup>
                </div>

                {(formData.primaryGoal === "weight-loss" || formData.primaryGoal === "weight-gain") && (
                  <div className="space-y-2">
                    <Label htmlFor="targetWeight">Poids cible (kg)</Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      placeholder="65"
                      value={formData.targetWeight}
                      onChange={(e) => setFormData((prev) => ({ ...prev, targetWeight: e.target.value }))}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Préférences alimentaires</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dietaryPreferences.map((preference) => (
                      <div key={preference} className="flex items-center space-x-2">
                        <Checkbox
                          id={preference}
                          checked={formData.dietaryPreferences.includes(preference)}
                          onCheckedChange={() => handlePreferenceToggle(preference)}
                        />
                        <Label htmlFor={preference} className="text-sm">
                          {preference}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Existing Protocols */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasExistingProtocol"
                      checked={formData.hasExistingProtocol}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, hasExistingProtocol: !!checked }))
                      }
                    />
                    <Label htmlFor="hasExistingProtocol">J'ai déjà un protocole alimentaire</Label>
                  </div>

                  {formData.hasExistingProtocol && (
                    <div className="space-y-4 ml-6">
                      <div className="space-y-2">
                        <Label>Source du protocole</Label>
                        <RadioGroup
                          value={formData.protocolSource}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, protocolSource: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nutritionist" id="nutritionist" />
                            <Label htmlFor="nutritionist">Nutritionniste/Diététicien</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="doctor" id="doctor" />
                            <Label htmlFor="doctor">Médecin</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hospital" id="hospital" />
                            <Label htmlFor="hospital">Hôpital/Clinique</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="self" id="self" />
                            <Label htmlFor="self">Auto-élaboré</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="p-6 border-2 border-dashed border-border rounded-lg text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <h4 className="font-medium text-foreground mb-1">Importer votre protocole</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Formats acceptés : PDF, Excel, Word (max 10MB)
                        </p>
                        <Button variant="outline">Choisir un fichier</Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Validation professionnelle</h4>
                  <p className="text-sm text-muted-foreground">
                    Tous les protocoles importés sont analysés par notre équipe de nutritionnistes pour garantir leur
                    compatibilité avec vos contraintes médicales.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>

          {currentStep === steps.length ? (
            <Button asChild className="flex items-center gap-2">
              <Link href="/dashboard">
                Terminer la configuration
                <CheckCircle className="w-4 h-4" />
              </Link>
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex items-center gap-2">
              Suivant
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
