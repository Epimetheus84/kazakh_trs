from flask import Blueprint, request, abort, jsonify, g
from orm.mongo.company import Company
from rest.helpers.auth import auth


companies = Blueprint('companies', __name__)


@companies.route('/list/', methods=['GET'])
@auth.login_required
def list_companies():
    if not g.current_user.has_access_to_companies_list():
        abort(403)

    page = request.args.get('page') or 1
    items_per_page = 10

    offset = (page - 1) * items_per_page

    list_companies = Company.objects.skip(offset).limit(items_per_page)
    result_list = []
    for user in list_companies:
        user_data = user.prepare_to_response()
        result_list.append(user_data)

    return jsonify(result_list)


@companies.route('/show/<oid>', methods=['GET'])
@auth.login_required
def show_company(oid):
    company = Company.objects(id=oid)

    if not company:
        abort(404)

    company = company.get()
    if not g.current_user.has_access_to_see_company(company.id):
        abort(403)

    return company.to_json()


@companies.route('/update/<oid>>', methods=['PUT'])
@auth.login_required
def update_company(oid):
    company = Company.objects(id=oid)
    data = request.json

    if not company:
        abort(404)

    company = company.get()
    if not g.current_user.has_access_to_update_company(company.id):
        abort(403)

    company.update_data(data)
    company.save()

    return company.to_json()


@companies.route('/create/', methods=['POST'])
@auth.login_required
def create_company():
    if not g.current_user.has_access_to_create_company():
        abort(403)

    data = request.json

    company = Company()
    company.insert_data(data)
    company.save()

    return company.to_json()


@companies.route('/delete/<oid>', methods=['DELETE'])
@auth.login_required
def delete_company(oid):
    company = Company.objects(id=oid)

    if not company:
        abort(404)

    company = company.get()
    if not g.current_user.has_access_to_delete_company(company.id):
        abort(403)

    company.delete()

    return jsonify(success=True)
