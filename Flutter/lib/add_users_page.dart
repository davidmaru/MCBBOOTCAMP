import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class AddUsersPage extends StatefulWidget {
  @override
  _AddUsersPageState createState() => _AddUsersPageState();
}

class _AddUsersPageState extends State<AddUsersPage> {
  final String addUsersMutation = """
  mutation (\$addUsers: UsersInput!) {
  saveUsers(newUsers:\$addUsers) {
    id
    age
    address
    name
    phone_number
  }
}
  """;

  final TextEditingController nameController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController phoneNumberController = TextEditingController();

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add User'),
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
              controller: phoneNumberController,
              decoration: InputDecoration(labelText: 'Phone Number'),
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 24.0),
            Mutation(
              options: MutationOptions(
                document: gql(addUsersMutation),
                onCompleted: (dynamic resultData) {
                  if (resultData != null) {
                    Navigator.of(context).pop(resultData['saveUsers']);
                  }
                },
              ),
              builder: (RunMutation runMutation, QueryResult? result) {
                return ElevatedButton(
                  onPressed: () {
                    runMutation({
                      "addUsers": {
                        'id': 0,
                        'name': nameController.text,
                        'age': int.parse(ageController.text),
                        'address': addressController.text,
                        'phone_number': phoneNumberController.text,
                      }
                    });

                    nameController.clear();
                    ageController.clear();
                    addressController.clear();
                    phoneNumberController.clear();
                  },
                  child: Text('Add User'),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
