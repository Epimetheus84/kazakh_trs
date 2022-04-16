import os

from flask import Blueprint, request, abort, jsonify, g, send_from_directory
from rest.helpers.auth import auth
from rest.helpers.mircoservices.text_marker import TextMarker
from rest.helpers.mircoservices.text_recognizer import TextRecognizer

from orm.mongo.image import Image

images = Blueprint('images', __name__)


# CRUD
@images.route('/list/', methods=['GET'])
@auth.login_required
def list_images():
    page = request.args.get('page') or 1
    items_per_page = 100

    offset = (page - 1) * items_per_page

    list_images = g.current_user.get_list_of_images(offset, items_per_page)
    result_list = []
    for user in list_images:
        user_data = user.prepare_to_response()
        result_list.append(user_data)

    return jsonify(result_list)


@images.route('/show/<file_path>', methods=['GET'])
@auth.login_required
def show_image(file_path):
    if not g.current_user.has_access_to_see_image():
        abort(403)

    image = Image.objects(file_path=file_path)

    if not image:
        abort(404)

    image = image.get()

    return jsonify(image.to_json())


@images.route('/update/<file_path>', methods=['PUT'])
@auth.login_required
def update_image(file_path):
    image = Image.objects(file_path=file_path)
    data = request.json

    if not image:
        abort(404)

    image = image.get()
    if not g.current_user.has_access_to_update_image(image.uploaded_by):
        abort(403)

    image.update_data(data)
    image.save()

    return jsonify(image.to_json())


@images.route('/create/', methods=['POST'])
@auth.login_required
def create_image():
    if not g.current_user.has_access_to_create_image():
        abort(403)

    data = request.form

    image = Image()
    image.insert_data(data)

    if 'file' not in request.files:
        return jsonify({'error': 'File not uploaded.'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'File not uploaded.'}), 400

    image.generate_file_path()
    image.original_filename = file.filename
    image.uploaded_by = g.current_user.login
    image.file_extension = image.get_uploaded_file_ext()

    if not image.upload(file):
        return jsonify({'error': 'This file cannot be uploaded.'}), 400

    image.set_image_sizes()

    image.save()

    return jsonify(image.to_json())


@images.route('/delete/<file_path>', methods=['DELETE'])
@auth.login_required
def delete_image(file_path):
    if not g.current_user.has_access_to_delete_image():
        abort(403)

    image = Image.objects(file_path=file_path)

    if not image:
        abort(404)

    image = image.get()
    image.delete_with_relations()

    return jsonify(success=True)


@images.route('/uploads/<path:path>')
def serve_images(path):
    return send_from_directory(os.path.join('..', 'data', 'production', 'images'), path)


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

    image.status = Image.IMAGE_STATUS_ON_PROCESSING
    image.save()

    response = TextMarker.mark(image.file_path)

    return response


@images.route('/recognize/<file_path>', methods=['GET'])
@auth.login_required
def recognize_image(file_path):
    if not g.current_user.has_access_to_recognize_image():
        abort(403)

    image = Image.objects(file_path=file_path)

    if not image:
        abort(404)

    image = image.get()

    if not image.can_be_recognized():
        abort(405)

    image.status = Image.IMAGE_STATUS_ON_PROCESSING
    image.save()

    response = TextRecognizer.recognize(image.file_path)

    return response
