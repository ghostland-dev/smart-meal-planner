"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react"

interface ProtocolFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "validated" | "error"
  progress: number
  errorMessage?: string
}

export function ProtocolImport() {
  const [files, setFiles] = useState<ProtocolFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    Array.from(fileList).forEach((file) => {
      const newFile: ProtocolFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      }

      setFiles((prev) => [...prev, newFile])

      // Simulate upload and processing
      simulateFileProcessing(newFile.id)
    })
  }

  const simulateFileProcessing = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = Math.min(file.progress + 10, 100)
            if (newProgress === 100) {
              clearInterval(uploadInterval)
              setTimeout(() => {
                setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "processing", progress: 0 } : f)))
                simulateProcessing(fileId)
              }, 500)
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 200)
  }

  const simulateProcessing = (fileId: string) => {
    const processingInterval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "processing") {
            const newProgress = Math.min(file.progress + 5, 100)
            if (newProgress === 100) {
              clearInterval(processingInterval)
              // Randomly succeed or fail for demo
              const success = Math.random() > 0.3
              setTimeout(() => {
                setFiles((prev) =>
                  prev.map((f) =>
                    f.id === fileId
                      ? {
                          ...f,
                          status: success ? "validated" : "error",
                          errorMessage: success ? undefined : "Format non reconnu ou données incomplètes",
                        }
                      : f,
                  ),
                )
              }, 500)
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 300)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: ProtocolFile["status"]) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      case "validated":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusText = (status: ProtocolFile["status"]) => {
    switch (status) {
      case "uploading":
        return "Téléchargement..."
      case "processing":
        return "Analyse en cours..."
      case "validated":
        return "Validé"
      case "error":
        return "Erreur"
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Import de protocoles
        </CardTitle>
        <CardDescription>Importez vos protocoles alimentaires existants (PDF, Excel, Word)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Glissez vos fichiers ici</h3>
          <p className="text-muted-foreground mb-4">ou cliquez pour sélectionner</p>
          <Input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <Button variant="outline">Choisir des fichiers</Button>
          <p className="text-xs text-muted-foreground mt-2">PDF, Word, Excel • Max 10MB par fichier</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Fichiers importés</h4>
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex-shrink-0">{getStatusIcon(file.status)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="flex-shrink-0 h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>{formatFileSize(file.size)}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">
                      {getStatusText(file.status)}
                    </Badge>
                  </div>

                  {(file.status === "uploading" || file.status === "processing") && (
                    <Progress value={file.progress} className="h-1" />
                  )}

                  {file.status === "error" && file.errorMessage && (
                    <p className="text-xs text-red-600 mt-1">{file.errorMessage}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Validation Info */}
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Processus de validation</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Analyse automatique du contenu nutritionnel</li>
            <li>• Vérification de la compatibilité avec vos contraintes médicales</li>
            <li>• Validation par notre équipe de nutritionnistes</li>
            <li>• Intégration dans votre profil alimentaire</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
