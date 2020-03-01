from flask import Blueprint, request, abort, jsonify, g
from rest.helpers.auth import auth

from orm.mongo.image import Image

images = Blueprint('images', __name__)


@images.route('/mark/<file_path>', methods=['GET'])
@auth.login_required
def mark_image(file_path):
    if not g.current_user.has_access_to_mark_image():
        abort(403)

    image = Image.objects(file_path=file_path)

    if not image:
        abort(404)

    image = image.get()

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


@images.route('/show/<file_path>', methods=['GET'])
@auth.login_required
def show_image(file_path):
    if not g.current_user.has_access_to_see_image():
        abort(403)

    image = Image.objects(file_path=file_path)

    if not image:
        abort(404)

    image = image.get()

    return image.to_json()


@images.route('/update/<file_path>', methods=['PUT'])
@auth.login_required
def update_image(file_path):
    if not g.current_user.has_access_to_update_image():
        abort(403)

    image = Image.objects(file_path=file_path)
    data = request.form

    if not image:
        abort(404)

    image = image.get()

    image.update_data(data)
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


@images.route('/delete/<file_path>', methods=['DELETE'])
@auth.login_required
def delete_image(file_path):
    if not g.current_user.has_access_to_delete_image():
        abort(403)

    image = Image.objects(file_path=file_path)

    if not image:
        abort(404)

    image = image.get()
    image.delete()

    return jsonify(success=True)
