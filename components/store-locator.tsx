"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Star, Phone, ExternalLink } from "lucide-react"

interface Store {
  id: string
  name: string
  logo: string
  address: string
  distance: number
  rating: number
  openUntil: string
  phone: string
  services: string[]
  coordinates: { lat: number; lng: number }
}

interface StoreLocatorProps {
  stores: Store[]
  userLocation?: { lat: number; lng: number }
}

export function StoreLocator({ stores }: StoreLocatorProps) {
  const mockStores: Store[] = [
    {
      id: "carrefour-1",
      name: "Carrefour Villeneuve",
      logo: "/carrefour-logo.png",
      address: "123 Avenue de la République, 69100 Villeurbanne",
      distance: 2.3,
      rating: 4.2,
      openUntil: "22:00",
      phone: "04 72 00 00 00",
      services: ["Livraison", "Click & Collect", "Pharmacie", "Station-service"],
      coordinates: { lat: 45.764, lng: 4.8357 },
    },
    {
      id: "leclerc-1",
      name: "E.Leclerc Lyon Part-Dieu",
      logo: "/leclerc-logo.png",
      address: "456 Rue de la Part-Dieu, 69003 Lyon",
      distance: 3.1,
      rating: 4.0,
      openUntil: "21:30",
      phone: "04 78 00 00 00",
      services: ["Livraison", "Click & Collect", "Drive"],
      coordinates: { lat: 45.7578, lng: 4.832 },
    },
    {
      id: "auchan-1",
      name: "Auchan Caluire",
      logo: "/auchan-logo.png",
      address: "789 Boulevard Laurent Bonnevay, 69300 Caluire-et-Cuire",
      distance: 5.2,
      rating: 3.8,
      openUntil: "21:00",
      phone: "04 72 10 00 00",
      services: ["Click & Collect", "Station-service"],
      coordinates: { lat: 45.7983, lng: 4.8467 },
    },
  ]

  const getServiceBadgeColor = (service: string) => {
    switch (service.toLowerCase()) {
      case "livraison":
        return "bg-green-100 text-green-800 border-green-200"
      case "click & collect":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "drive":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Placeholder */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="h-64 bg-muted/30 rounded-t-lg flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Carte interactive des magasins</p>
              <p className="text-sm text-muted-foreground">Géolocalisation et itinéraires</p>
            </div>
            {/* Mock map pins */}
            <div className="absolute top-4 left-4">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div className="absolute bottom-8 right-8">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
            <div className="absolute top-12 right-12">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store List */}
      <div className="space-y-4">
        {mockStores.map((store) => (
          <Card key={store.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <img src={store.logo || "/placeholder.svg"} alt={store.name} className="w-12 h-12 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{store.name}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-foreground">{store.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        <span>{store.distance}km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Ouvert jusqu'à {store.openUntil}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{store.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {store.services.map((service) => (
                      <Badge key={service} className={getServiceBadgeColor(service)} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Navigation className="w-4 h-4 mr-2" />
                      Itinéraire
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Site web
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
