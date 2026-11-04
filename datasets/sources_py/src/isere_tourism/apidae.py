### Fetch the Apidae selection and identifiers ###

import json
from typing import Any

import requests

# -------------------------------------------------------------------------
# Configuration
# -------------------------------------------------------------------------

API_BASE_URL = "https://api.apidae-tourisme.com/api/v002"
SELECTIONS_ENDPOINT = f"{API_BASE_URL}/referentiel/selections/"
OBJECTS_ENDPOINT = f"{API_BASE_URL}/recherche/list-objets-touristiques/"

PROJECT_ID = 9657
API_KEY = "3Ch7iOsI"  # Hackathon key, available in the Excel file

SELECTION_IDS = [
    211884,
    211888,
    211889,
    211890,
    211891,
    211892,
    211905,
    211906,
    211908,
    211911,
    211914,
    211999,
]
PAGE_SIZE = 100
FIRST_PAGE = 0

# -------------------------------------------------------------------------
# Functions
# -------------------------------------------------------------------------


def post_query(url: str, query: dict[str, Any]) -> Any:
    """Post an Apidae query and return the decoded JSON response."""
    response = requests.post(
        url,
        data={"query": json.dumps(query)},
        timeout=60,
    )
    response.raise_for_status()
    return response.json()


def fetch_selections(project_id: int, api_key: str) -> Any:
    """Fetch the available selections for a project."""
    query = {
        "projetId": project_id,
        "apiKey": api_key,
    }
    return post_query(SELECTIONS_ENDPOINT, query)


def fetch_tourist_objects(
    project_id: int,
    api_key: str,
    selection_ids: list[int],
) -> dict[str, Any]:
    """Fetch the first page of tourist objects for the given selections."""
    query = {
        "projetId": project_id,
        "apiKey": api_key,
        "selectionIds": selection_ids,
        "count": PAGE_SIZE,
        "first": FIRST_PAGE,
    }
    result: dict[str, Any] = post_query(OBJECTS_ENDPOINT, query)
    return result


def main() -> None:
    selections = fetch_selections(PROJECT_ID, API_KEY)
    print(selections)
    print(json.dumps(selections, indent=2, ensure_ascii=False))

    tourist_objects = fetch_tourist_objects(PROJECT_ID, API_KEY, SELECTION_IDS)
    print(json.dumps(tourist_objects, indent=2, ensure_ascii=False))

    objects = tourist_objects.get("objetsTouristiques")
    if objects:
        print(objects[0].keys())


if __name__ == "__main__":
    main()
