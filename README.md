# Deploying Active Directory in Azure

## Project overview

In this lab, I build on **Part 1 — Preparing Active Directory in Azure** by installing Active Directory Domain Services on `dc-1`, creating a domain, and joining `client-1` to it. I also create a dedicated domain administrator account and organize the directory with organizational units.

This walkthrough is written for beginners and explains the purpose behind each major step.

**Scope:** This part covers deploying the domain, configuring the administrator account, and organizing the client computer. Creating additional users and configuring Remote Desktop access for non-administrative users are planned next steps.

## What changes in this lab?

At the end of Part 1, the two VMs could communicate over the network, but no Active Directory domain had been deployed. In this part, `dc-1` becomes the domain controller for `mydomain.com`, and `client-1` becomes a member of that domain.

A **domain controller** stores and manages the directory, including domain user accounts and computer accounts. A **forest** is the top-level structure in Active Directory; this lab creates a new forest containing one domain.

## Lab environment

| Component | Name or configuration | Purpose |
| --- | --- | --- |
| Domain controller | `dc-1` — Windows Server | Hosts Active Directory Domain Services |
| Client workstation | `client-1` — Windows Pro | Joins the domain |
| Domain | `mydomain.com` | Lab domain used in this walkthrough |
| Initial administrator | `labuser` | Installs and configures Active Directory |
| Dedicated domain administrator | `jane_admin` — Jane Doe | Performs the remaining domain administration tasks |
| Organizational units | `_EMPLOYEES`, `_ADMINS`, `_CLIENTS` | Organize users and computers |

Names in this guide are lab examples. If you chose different names in your own environment, substitute them consistently.

## Before you begin

Complete the preparation from Part 1:

- Create `dc-1` and `client-1` in the same Azure virtual network.
- Assign `dc-1` a static private IP address.
- Configure `client-1` to use `dc-1`'s private IP address as its DNS server.
- Confirm that the client can reach the server over the private network.
- Have your VM administrator credentials and Remote Desktop client ready.

Use your own strong passwords. The example password from the draft has been replaced with instructions to create one.

## 1. Install Active Directory Domain Services

First, install the server role that provides Active Directory. Installing the role is separate from promoting the server to a domain controller.

1. Connect to `dc-1` through Remote Desktop using the original administrator account, `labuser`.
2. Open **Server Manager**.
3. Select **Manage → Add Roles and Features**.
4. Continue past **Before you begin**.
5. Select **Role-based or feature-based installation**.
6. Select `dc-1` as the destination server.
7. On **Server Roles**, select **Active Directory Domain Services** and accept the required features when prompted.
8. Continue through the remaining pages without adding unrelated roles or features.
9. Review the selections and select **Install**.
10. When installation finishes, close the wizard.

<details>
<summary>View role installation screenshots</summary>

![Server Manager dashboard](images/step-01.png)

![Starting the Add Roles and Features Wizard](images/step-02.png)

![Selecting role-based or feature-based installation](images/step-03.png)

![Selecting the destination server](images/step-04.png)

![Selecting Active Directory Domain Services](images/step-05.png)

![Reviewing required features](images/step-06.png)

![Reviewing the Active Directory Domain Services role](images/step-07.png)

![Confirming the role installation](images/step-08.png)

</details>

## 2. Promote dc-1 to a domain controller

Promotion configures Active Directory and creates the new forest and domain.

1. In **Server Manager**, open the notification flag.
2. Select **Promote this server to a domain controller**.
3. On **Deployment Configuration**, select **Add a new forest**.
4. Enter `mydomain.com` as the **Root domain name**.
5. On **Domain Controller Options**, review the forest and domain functional levels. Leave **DNS server** and **Global Catalog** selected for this lab.
6. Create and securely record a **Directory Services Restore Mode (DSRM)** password.
7. Continue through **DNS Options**, **Additional Options**, and **Paths**, reviewing the settings.
8. Review the configuration and run the prerequisite checks.
9. Once the checks pass, select **Install**.
10. Allow the server to restart after promotion.

The DSRM password is a recovery credential set during promotion. Keep it separate from the instructions you publish in your portfolio.

<details>
<summary>View domain controller promotion screenshots</summary>

![Server Manager post-deployment notification](images/step-09.png)

![Opening domain controller promotion](images/step-10.png)

![Creating a new forest with the mydomain.com root domain](images/step-11.png)

![Configuring domain controller options and the DSRM password](images/step-12.png)

![Reviewing DNS options](images/step-13.png)

![Reviewing the domain NetBIOS name](images/step-14.png)

![Reviewing database and log paths](images/step-15.png)

![Reviewing deployment options](images/step-16.png)

![Running prerequisite checks](images/step-17.png)

![Restarting after domain controller promotion](images/step-18.png)

</details>

## 3. Sign in to the domain controller

After the restart, reconnect to `dc-1` and sign in with the domain account used in the lab:

```text
mydomain.com\labuser
```

Use the password associated with that account.

**Why include the domain?** Specifying the domain identifies the directory that the account belongs to. The server is now a domain controller, so the sign-in context has changed from the original standalone server setup.

## 4. Create organizational units

An **organizational unit (OU)** is a container used to organize objects such as users and computers within the domain.

1. On `dc-1`, open **Active Directory Users and Computers (ADUC)** from **Windows Administrative Tools** or Server Manager's **Tools** menu.
2. Expand `mydomain.com`.
3. Right-click the domain and select **New → Organizational Unit**.
4. Name the OU `_EMPLOYEES` and select **OK**.
5. Repeat the process to create `_ADMINS`.

The leading underscore is a naming convention used in this lab to make custom OUs easy to distinguish from built-in containers. OUs are directory objects, not filesystem folders.

<details>
<summary>View organizational unit screenshots</summary>

![Opening Windows Administrative Tools](images/step-19.png)

![Locating Active Directory Users and Computers](images/step-20.png)

![Creating a new organizational unit](images/step-21.png)

![Naming the employees organizational unit](images/step-22.png)

![Creating a second organizational unit](images/step-23.png)

![Naming the administrators organizational unit](images/step-24.png)

</details>

## 5. Create the dedicated administrator account

Create a user account for Jane Doe inside `_ADMINS`.

1. Right-click `_ADMINS` and select **New → User**.
2. Enter the following details:

   | Field | Value |
   | --- | --- |
   | First name | `Jane` |
   | Last name | `Doe` |
   | User logon name | `jane_admin` |

3. Select **Next** and enter your own strong password.
4. Review the password options, then complete the wizard.

**Important:** Naming an account `jane_admin` or placing it in `_ADMINS` does not grant administrative permissions. The next step adds the account to the required security group.

The screenshots show **Password never expires** selected as part of the original lab configuration; this is not required to grant administrator access.

<details>
<summary>View user creation screenshots</summary>

![Creating a user in the administrators OU](images/step-25.png)

![Entering Jane Doe and jane_admin account details](images/step-26.png)

![Configuring the new user password options](images/step-27.png)

![Reviewing the new user account](images/step-28.png)

</details>

## 6. Add jane_admin to Domain Admins

Group membership grants the account its domain administrator permissions.

1. In ADUC, open `_ADMINS`.
2. Right-click **Jane Doe** and select **Properties**.
3. Open the **Member Of** tab and select **Add**.
4. Enter `Domain Admins`.
5. Select **Check Names** to resolve the group, then select **OK**.
6. Confirm that **Domain Admins** appears in the membership list.
7. Select **Apply**, then **OK**.
8. Sign out of `dc-1` and reconnect using:

   ```text
   mydomain.com\jane_admin
   ```

Use `jane_admin` for the remaining administrative tasks in this lab.

<details>
<summary>View Domain Admins membership screenshots</summary>

![Opening Jane Doe account properties](images/step-29.png)

![Reviewing current group membership](images/step-30.png)

![Adding a security group membership](images/step-31.png)

![Resolving the Domain Admins group name](images/step-32.png)

![Confirming Domain Admins membership](images/step-33.png)

</details>

## 7. Join client-1 to the domain

Joining the client establishes its membership in the Active Directory domain.

1. Connect to `client-1` through Remote Desktop using the original local administrator account, `labuser`.
2. Open **Settings → System → About**.
3. Open **Rename this PC (advanced)** to access **System Properties**.
4. On the **Computer Name** tab, select **Change**.
5. Under **Member of**, select **Domain**.
6. Enter `mydomain.com` and select **OK**.
7. When prompted for credentials, enter the domain administrator account:

   ```text
   mydomain.com\jane_admin
   ```

8. Enter its password and confirm.
9. After the domain welcome message appears, acknowledge the prompts and restart `client-1`.

**Why does DNS matter?** The client needs to locate the domain controller to join the domain. Its DNS settings should still point to `dc-1`'s private IP address, as configured in Part 1.

Domain membership does not automatically grant every domain user permission to connect through Remote Desktop. Access for non-administrative users will be configured separately.

<details>
<summary>View domain join screenshots</summary>

![Opening client system settings](images/step-34.png)

![Opening System Properties](images/step-35.png)

![Opening computer name and domain settings](images/step-36.png)

![Entering the domain name](images/step-37.png)

![Entering credentials to join the domain](images/step-38.png)

![Restarting the client after the domain join](images/step-39.png)

</details>

## 8. Verify the client computer account

1. Return to `dc-1` and sign in as `jane_admin`.
2. Open **Active Directory Users and Computers**.
3. Expand `mydomain.com` and select the **Computers** container.
4. Confirm that `client-1` appears in the list.

This verifies that the client computer account is present in Active Directory after the domain join.

<details>
<summary>View client verification screenshots</summary>

![Opening Active Directory Users and Computers for verification](images/step-40.png)

![Locating client-1 in the Computers container](images/step-41.png)

</details>

## 9. Organize the client in its own OU

Create a dedicated OU to keep client computers organized separately from user accounts.

1. In ADUC, right-click `mydomain.com` and select **New → Organizational Unit**.
2. Name the OU `_CLIENTS` and select **OK**.
3. Open the **Computers** container.
4. Drag `client-1` into `_CLIENTS` and confirm the move if prompted.
5. Open `_CLIENTS` and confirm that the computer is listed there.

<details>
<summary>View client organization screenshots</summary>

![Creating an OU for client computers](images/step-42.png)

![Naming the clients organizational unit](images/step-43.png)

![Moving client-1 into the clients OU](images/step-44.png)

</details>

## Results

This walkthrough documents:

- Installation of Active Directory Domain Services on `dc-1`.
- Creation of the `mydomain.com` forest and domain.
- Creation of `_EMPLOYEES`, `_ADMINS`, and `_CLIENTS` organizational units.
- Creation of `jane_admin` and its addition to **Domain Admins**.
- Joining `client-1` to the domain and locating its computer account in ADUC.
- Moving the client computer into `_CLIENTS`.

## Skills practiced

- Installing Windows Server roles with Server Manager.
- Promoting a server to an Active Directory domain controller.
- Managing users, organizational units, and security group memberships in ADUC.
- Using domain credentials for administrative tasks.
- Joining a Windows client to a domain and organizing its computer account.

## Next steps

Continue the lab by configuring Remote Desktop access for non-administrative domain users, creating additional users in `_EMPLOYEES`, and testing sign-in to `client-1` with a standard domain account.
