"""Unit tests for the Geovelo route calculator.

These tests do not perform any network request.
"""

from isere_tourism.geovelo_route_calculator import build_request_body


def test_build_request_body_contains_waypoints() -> None:
    body = build_request_body()

    assert len(body["waypoints"]) == 2
    assert body["waypoints"][0]["latitude"] == 45.367018
    assert body["waypoints"][0]["longitude"] == 5.593923
    assert body["waypoints"][0]["title"] == "Musée Mainssieux - Voiron"
    assert body["waypoints"][1]["latitude"] == 44.816186
    assert body["waypoints"][1]["longitude"] == 5.522818
    assert body["waypoints"][1]["title"] == "Monument du Pas de l'Aiguille - Chichilianne"


def test_build_request_body_contains_bike_details() -> None:
    body = build_request_body()

    assert body["bikeDetails"]["profile"] == "MEDIAN"
    assert body["bikeDetails"]["bikeType"] == "TRADITIONAL"
    assert body["bikeDetails"]["averageSpeed"] == 15
    assert body["transportModes"] == ["BIKE", "PEDESTRIAN"]
