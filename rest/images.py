from flask import Blueprint, request, abort, jsonify, g
from flask_httpauth import HTTPTokenAuth

auth = HTTPTokenAuth(scheme='Token')

from orm.mongo.image import Image

images = Blueprint('images', __name__)

@images.route('/mark/<id>', methods=['GET'])
@auth.login_required
def mark_image():
    if not g.current_user.has_access_to_mark_image():
        abort(403)

    image = Image.objects.get({'_id': id})

    if not image:
        abort(404)

    if not image.can_be_marked():
        abort(405)




# CRUD
@images.route('/list/', methods=['GET'])
@auth.login_required
def list_images():
    if not g.current_user.has_access_to_images_list():
        abort(403)

    page = request.args.get('page') or 1
    items_per_page = 10

    offset = (page - 1) * items_per_page

    list_images = Image.objects.skip(offset).limit(items_per_page).get()

    return list_images.to_json()


@images.route('/show/<id>', methods=['GET'])
@auth.login_required
def show_image(id):
    if not g.current_user.has_access_to_see_image():
        abort(403)

    image = Image.objects.get({'_id': id})

    if not image:
        abort(404)

    return image.to_json()


@images.route('/update/<id>', methods=['PUT'])
@auth.login_required
def update_image(id):
    if not g.current_user.has_access_to_update_image():
        abort(403)

    image = Image.objects.get({'_id': id})
    data = request.form

    if not image:
        abort(404)

    image.insert_data(data)
    image.save()

    return image.to_json()


@images.route('/create/', methods=['POST'])
@auth.login_required
def create_image():
    if not g.current_user.has_access_to_create_image():
        abort(403)

    data = request.form

    image = Image()
    image.insert_data(data)
    image.save()

    return image.to_json()


@images.route('/delete/<id>', methods=['DELETE'])
@auth.login_required
def delete_image(id):
    if not g.current_user.has_access_to_delete_image():
        abort(403)

    image = Image.objects.get({'_id': id})

    if not image:
        abort(404)

    return jsonify(success=True)
