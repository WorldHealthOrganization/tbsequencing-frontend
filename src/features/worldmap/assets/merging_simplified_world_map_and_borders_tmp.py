import json

countries_to_be_fixed = [
    "CHN",
    "EGY",
    "IND",
    "ISR",
    "KOR",
    "PAK",
    "PRK",
    "PSE",
    "RUS",
    "SDN",
    "SSD"
]

fixed_borders = {}

for country in countries_to_be_fixed:
    mainland = "QGISModifiedBorders/MainLands/" + country + ".geojson"
    islands = "QGISModifiedBorders/Islands/" + country + ".geojson"
    borders = []
    try:
        f = open(islands, "r", encoding="utf8")
        data = json.load(f)
        for feature in data["features"]:
            if feature["geometry"]["type"] == "LineString":
                borders.append(feature["geometry"]["coordinates"])
            elif feature["geometry"]["type"] == "MultiLineString":
                for line in feature["geometry"]["coordinates"]:
                    borders.append(line)
        f.close()
    except FileNotFoundError:
        pass
    f = open(mainland, "r", encoding="utf8")
    data = json.load(f)
    for feature in data["features"]:
        if feature["geometry"]["type"] == "LineString":
            borders.append(feature["geometry"]["coordinates"])
        elif feature["geometry"]["type"] == "MultiLineString":
            for line in feature["geometry"]["coordinates"]:
                borders.append(line)
    print(country, len(borders))
    fixed_borders[country] = {
        "type": "MultiLineString",
        "coordinates": borders
    }

with open('QGISModifiedBorders/WHO_ADM0_simplified_by_area_tolerance_0_15.geojson', 'r', encoding="utf8") as f:
    data = json.load(f)

for feature in data["features"]:
    feature["properties"] = {k: feature["properties"][k] for k in ("ISO_3_CODE", "WHO_REGION", "ADM0_SOVRN", "GUID")}
    if feature["properties"]["ISO_3_CODE"]=="IOT":
        new_polygon = []
        print(feature["geometry"]["coordinates"])
        for coordinate in feature["geometry"]["coordinates"]:
                new_shape = []
                for shape in coordinate:
                    new_shape.append(list([list(u) for u in set([tuple(v) for v in shape])]))
                new_polygon.append(new_shape)
        print(new_polygon)
        feature["geometry"]["coordinates"] = new_polygon
    if feature["properties"]["ISO_3_CODE"] in countries_to_be_fixed:
        polygon_copy = feature["geometry"].copy()
        feature["geometry"] = {
            "type": "GeometryCollection",
            "geometries":[
                polygon_copy,
                fixed_borders[feature["properties"]["ISO_3_CODE"]]
            ]
        }

with open('odata.json', 'w', encoding="utf8") as outfile:
    json.dump(data, outfile, indent=2)


