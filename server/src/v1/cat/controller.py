from flask import request, make_response, jsonify
from v1.cat.model import CatModel


class CatController():
    _instance = None

    def __init__(self) -> None:
        self._instance = CatModel()

    def post(self):
        response = self._instance.create(request.json)
        if response == False:
            return make_response(jsonify({
                "error": "Failed to add. There are items in your request that are invalid."
            }), 400)
        return jsonify(response)

    def check(self, cat_id):
        cat = self._instance.read({"id": cat_id})
        if cat is None:
            return make_response(jsonify({"error": "Cat id not found."}), 404)
        return cat

    def get(self, cat_id=None):
        if cat_id is not None:
            cat = self.check(cat_id)
            if not isinstance(cat, dict):
                return cat
            return jsonify(cat)
        # if none
        cats = self._instance.read()
        return jsonify(cats)

    def put(self, cat_id=None):
        if cat_id is not None:
            cat = self.check(cat_id)
            if not isinstance(cat, dict):
                return cat
            cat_data = request.json
            cat_data['id'] = cat_id
            response = self._instance.update(cat_data)
            if response == False:
                return make_response(jsonify({
                    "error": "Failed to update. There are items in your request that are invalid."
                }), 400)
            return jsonify(response)
        return jsonify(self._instance.update(request.json))

    def delete(self, cat_id=None):
        if cat_id is not None:
            cat = self.check(cat_id)
            if not isinstance(cat, dict):
                return cat
            return jsonify(self._instance.delete(cat_id))
        return jsonify(self._instance.delete(request.json))
