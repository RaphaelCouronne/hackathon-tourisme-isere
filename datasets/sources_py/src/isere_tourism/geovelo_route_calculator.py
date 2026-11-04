# ============================================================
# GEOVELO API - BIKE ROUTE CALCULATION
# ============================================================

import json
from typing import Any, cast

import requests

# -------------------------------------------------------------------------
# Configuration
# -------------------------------------------------------------------------

API_URL = "https://backend.geovelo.fr/api/v2/computedroutes"
API_KEY = "Ma clé"  # Hackathon key, available in the Excel file

START_LATITUDE = 45.367018
START_LONGITUDE = 5.593923
START_NAME = "Musée Mainssieux - Voiron"

END_LATITUDE = 44.816186
END_LONGITUDE = 5.522818
END_NAME = "Monument du Pas de l'Aiguille - Chichilianne"

BIKE_PROFILE = "MEDIAN"
BIKE_TYPE = "TRADITIONAL"
AVERAGE_SPEED = 15

INCLUDE_INSTRUCTIONS = False
INCLUDE_ELEVATIONS = False
INCLUDE_GEOMETRY = True
SINGLE_RESULT = False
SHOW_RIDE_ITINERARY = True  # Set to True to request the tourist route as well

# -------------------------------------------------------------------------
# Functions
# -------------------------------------------------------------------------


def build_request_body() -> dict[str, Any]:
    """Build the JSON body sent to the Geovelo API."""
    return {
        "waypoints": [
            {
                "latitude": START_LATITUDE,
                "longitude": START_LONGITUDE,
                "title": START_NAME,
            },
            {
                "latitude": END_LATITUDE,
                "longitude": END_LONGITUDE,
                "title": END_NAME,
            },
        ],
        "bikeDetails": {
            "profile": BIKE_PROFILE,
            "bikeType": BIKE_TYPE,
            "averageSpeed": AVERAGE_SPEED,
        },
        "transportModes": ["BIKE", "PEDESTRIAN"],
    }


def compute_route(body: dict[str, Any]) -> requests.Response:
    """Send the route request to the Geovelo API."""
    return requests.post(
        API_URL,
        params={
            "instructions": str(INCLUDE_INSTRUCTIONS).lower(),
            "elevations": str(INCLUDE_ELEVATIONS).lower(),
            "geometry": str(INCLUDE_GEOMETRY).lower(),
            "single_result": str(SINGLE_RESULT).lower(),
        },
        headers={
            "Content-Type": "application/json",
            "Api-Key": API_KEY,
        },
        json=body,
        timeout=120,
    )


def main() -> None:
    body = build_request_body()
    response = compute_route(body)

    print(response.status_code)

    result: Any = response.json()
    if isinstance(result, dict):
        print(cast("dict[str, Any]", result).keys())

    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
