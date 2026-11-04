# =====================================================================
# OPENSTREETMAP DATA RETRIEVAL
# =====================================================================

import geopandas as gpd
import matplotlib.pyplot as plt
import osmnx as ox
import pandas as pd

# -----------------------------------------------------------------------------
# Configuration (to be modified)
# -----------------------------------------------------------------------------

PLACE = "Isère, Auvergne-Rhône-Alpes, France"
TAG_KEY = "amenity"  # To be modified
TAG_VALUE = "restaurant"  # To be modified
OUTPUT_FILE = "resultat_Isere.xlsx"

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------


def fetch_osm_objects(place: str, tag_key: str, tag_value: str) -> gpd.GeoDataFrame:
    """Retrieve the OpenStreetMap objects located in the given place."""
    return ox.features_from_place(place, tags={tag_key: tag_value})


def get_layer(data: gpd.GeoDataFrame, geometry_type: str) -> gpd.GeoDataFrame:
    """Select the OpenStreetMap objects of the given geometry type."""
    return data[data.geometry.geom_type == geometry_type]


def plot_layers(
    points: gpd.GeoDataFrame,
    polygons: gpd.GeoDataFrame,
    multipolygons: gpd.GeoDataFrame,
) -> None:
    """Plot the OSM point, polygon and multipolygon layers."""
    polygons.plot(column="name", legend=True)
    multipolygons.plot(column="name", legend=True)
    points.plot(column="name", legend=True)
    plt.show()


def export_excel(layers: dict[str, gpd.GeoDataFrame], path: str) -> None:
    """Export the OSM layers to an Excel file."""
    excel_files: dict[str, pd.DataFrame] = {}
    for layer_name, layer in layers.items():
        if len(layer) == 0:
            continue
        excel_files[layer_name] = pd.DataFrame(layer.drop(columns="geometry"))

    with pd.ExcelWriter(path, engine="openpyxl") as writer:
        for layer_name, dataframe in excel_files.items():
            dataframe.to_excel(writer, sheet_name=layer_name, index=False)


def main() -> None:
    objects: gpd.GeoDataFrame = fetch_osm_objects(PLACE, TAG_KEY, TAG_VALUE)

    layers: dict[str, gpd.GeoDataFrame] = {
        "osm_points": get_layer(objects, "Point"),
        "osm_lines": get_layer(objects, "LineString"),
        "osm_multilines": get_layer(objects, "MultiLineString"),
        "osm_polygons": get_layer(objects, "Polygon"),
        "osm_multipolygons": get_layer(objects, "MultiPolygon"),
    }

    plot_layers(
        get_layer(objects, "Point"),
        get_layer(objects, "Polygon"),
        get_layer(objects, "MultiPolygon"),
    )
    export_excel(layers, OUTPUT_FILE)


if __name__ == "__main__":
    main()
