import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

final String updateUsersMutation = """
  mutation updateUsers(\$updateUsers:UsersInput!){
  updateUsers(updateUsers:\$updateUsers){
    id
    name
    age
    address
    phone_number
  }

  }
  """;

final String deleteUsersMutation = """
  mutation(\$id:Int!){
  deleteUsers(id:\$id)
}
""";

class EditUsersPage extends StatelessWidget {
  final Map<String, dynamic> user;

  EditUsersPage({required this.user});

  final TextEditingController nameController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController phone_numberController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    nameController.text = user['name'];
    ageController.text = user['age'].toString();
    addressController.text = user['address'];
    phone_numberController.text = user['phone_number'];
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit User'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Name'),
            ),
            SizedBox(height: 12.0),
            TextField(
              controller: ageController,
              decoration: InputDecoration(labelText: 'Age'),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 12.0),
            TextField(
              controller: addressController,
              decoration: InputDecoration(labelText: 'Address'),
            ),
            SizedBox(height: 12.0),
            TextField(
              controller: phone_numberController,
              decoration: InputDecoration(labelText: 'Phone Number'),
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 24.0),
            Mutation(
              options: MutationOptions(
                document: gql(updateUsersMutation),
                onCompleted: (dynamic resultData) {
                  Navigator.of(context).pop(true);
                },
              ),
              builder: (RunMutation runMutation, QueryResult? result) {
                return ElevatedButton(
                  onPressed: () {
                    runMutation({
                      "updateUsers": {
                        'id': user['id'],
                        'name': nameController.text,
                        'age': int.parse(ageController.text),
                        'address': addressController.text,
                        'phone_number': phone_numberController.text,
                      }
                    });

                    nameController.clear();
                    ageController.clear();
                    addressController.clear();
                    phone_numberController.clear();
                  },
                  child: Text('Edit User'),
                );
              },
            ),
            SizedBox(height: 10),
            Mutation(
              options: MutationOptions(
                document: gql(deleteUsersMutation),
                onCompleted: (dynamic resultData) {
                  Navigator.of(context).pop();
                },
              ),
              builder: (RunMutation runMutation, QueryResult? result) {
                return ElevatedButton(
                  child: Text('Delete'),
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('CONFIRM DELETION'),
                          content: Text(
                              'Are you sure you want to Delete this Loyal User?'),
                          actions: <Widget>[
                            TextButton(
                              child: Text('Cancel'),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ),
                            TextButton(
                              child: Text('Delete'),
                              onPressed: () {
                                runMutation({'id': user['id']});
                                Navigator.of(context).pop();
                              },
                            ),
                          ],
                        );
                      },
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
